from sklearn.model_selection import train_test_split
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestRegressor
from nltk.tokenize import word_tokenize

import pickle as cPickle
import pandas as pd
import numpy as np
import os

from .embeddings import WordEmbeddings
from .spelling import SpellCorrector
from .grammar import GrammarCorrector

DATA_DIR = './server/app/scorer/data'
MODEL_DIR = './server/app/scorer/models'
TRAIN_FILE = 'training_set_rel3.tsv'


class Scorer(object):

    def __init__(self, cv_score=True, save_model=True, load_model=False):
        self.texts = []
        self.scores = []
        self.sc = SpellCorrector()
        self.gc = GrammarCorrector()
        self.we = WordEmbeddings()
        self.regressor = RandomForestRegressor(
            n_estimators=100,
            min_samples_split=4,
            min_samples_leaf=3,
            random_state=1
        )
        self.cv_score = cv_score
        self.save_model_ = save_model
        self.load_model_ = load_model
        self.prompt = 1

    def load_model(self):
        MODEL_FILE = f'rf_model_{self.prompt}.pickle'
        if os.path.isfile(os.path.join(MODEL_DIR, MODEL_FILE)):
            with open(os.path.join(MODEL_DIR, MODEL_FILE), 'rb') as f:
                self.regressor = cPickle.load(f)
            return True
        else:
            # File does not exist. Will have to train a new one
            return False

    def save_model(self):
        MODEL_FILE = f'rf_model_{self.prompt}.pickle'
        with open(os.path.abspath(os.path.join(MODEL_DIR, MODEL_FILE)), 'wb') as f:
            cPickle.dump(self.regressor, f)

    def infer(self, prompt, text):
        self.prompt = prompt
        self.texts = [text]
        self.we.load_model()
        if not self.load_model():
            print(f'[ERROR] Couldnt find model file for prompt {prompt}')

        feat_mat = self.create_meta_features()
        vect_mat = self.create_vect_features()
        self.features = np.hstack([vect_mat, feat_mat])
        score = self.regressor.predict(self.features)

        return score[0]
        #print(f'Essay grade for prompt {prompt}: {score[0]}')

    def train(self, prompt=1):
        self.prompt = prompt

        print('Trainning has started ...\n')
        print(
            f'1) Loading essays for prompt {prompt} ... ', end='', flush=True)
        self.load_essays()
        print('[OK]')

        if False:
            print(f'2) Trainnig word embeddings model ... ',
                  end='', flush=True)
            self.train_embeddings()
            print('[OK]')
        else:
            print(f'2) Loading word embeddings model ... ', end='', flush=True)
            self.we.load_model()
            print('[OK]')

        print(f'3) Create meta features ... ', end='', flush=True)
        feat_mat = self.create_meta_features()
        print('[OK]')

        print(f'4) Create word vector features ... ', end='', flush=True)
        vect_mat = self.create_vect_features()
        print('[OK]')

        self.features = np.hstack([vect_mat, feat_mat])

        if self.cv_score:
            print(
                f'*) [OPTIONAL] Perform cross validation score on model ... ', end='', flush=True)
            mean, std = self.score_model()
            print('[OK]')
            print("%0.2f accuracy with a standard deviation of %0.2f" %
                  (mean, std))

        X_train, X_test, y_train, y_test = train_test_split(
            self.features, self.scores, test_size=0.33, random_state=42)

        # if self.load_model_:
        #     # Load model
        #     print(f'5) Loading model ... ', end='', flush=True)
        #     if self.load_model():
        #         print('[OK]')
        #     else:
        #         print(f'[ERROR] Model does not exist. Tranning new one ... ')

        # Fit model
        print(f'5) Fit model ... ', end='', flush=True)
        self.regressor.fit(X_train, y_train)
        print('[OK]')

        # Score on test set
        print(f'6) Score model ...', end='', flush=True)
        score = self.regressor.score(X_test, y_test)
        print('[OK]')

        print("%0.2f accuracy on test set" % score)

        # Save model
        if self.save_model_:
            print(f'7) Saving model ...', end='', flush=True)
            self.save_model()
            print('[OK]')

    def score_model(self):
        scores = cross_val_score(
            self.regressor, self.features, self.scores, cv=5)
        return scores.mean(), scores.std()

    def create_vect_features(self):
        vector_array = [self.we.infer(word_tokenize(text))
                        for text in self.texts]
        vect_feats = np.matrix(vector_array)

        return vect_feats

    def create_meta_features(self):
        meta_feats = [self.infer_features(text) for text in self.texts]
        meta_keys = meta_feats[0].keys()
        meta_feat_arr = []
        for feat in meta_feats:
            meta_feat_arr.append(np.matrix([feat[k] for k in meta_keys]))

        feat_mat = np.vstack(meta_feat_arr)

        return feat_mat

    def load_essays(self):
        df = pd.read_csv(os.path.join(DATA_DIR, TRAIN_FILE),
                         sep='\t', encoding='ISO-8859-1')
        df = df.dropna(axis=1)
        df['target'] = (df['rater1_domain1'] + df['rater2_domain1'])/2
        df = df.drop(columns=['rater1_domain1',
                              'rater2_domain1', 'domain1_score', 'essay_id'])
        self.texts = df[df['essay_set'] == self.prompt]['essay'].values
        self.scores = df[df['essay_set'] == self.prompt]['target'].values

    def train_embeddings(self):
        self.we.train()

    def infer_features(self, text):
        feats = {}
        feats.update(self.infer_meta_features(text))
        # feats.update(self.infer_meta_features(text))
        feats.update(self.infer_grammar(text))

        return feats

    def infer_spelling(self, text):
        spelling_errors, spelling_markup, raw_spelling = self.sc.correct_string(
            text)

        return {
            'spelling_errors': spelling_errors
        }

    def infer_meta_features(self, text):
        length = len(text)
        word_length = len(text.split())
        sentence_length = len(text.split("."))
        chars_per_sentence = length / (sentence_length + 1)
        words_per_sentence = word_length / (sentence_length + 1)
        chars_per_word = length / (word_length + 1)

        return {
            'length': length,
            'word_length': word_length,
            'sentence_length': sentence_length,
            'chars_per_sentence': chars_per_sentence,
            'words_per_sentence': words_per_sentence,
            'chars_per_word': chars_per_word
        }

    def infer_grammar(self, text):
        grammar_errors, grammar_markup, raw_grammar = self.gc.correct_string(
            text)
        grammar_features = self.generate_grammar_features(raw_grammar)
        grammar_features['grammar_errors'] = grammar_errors

        return grammar_features

    def infer_embeddings(self, text):
        word_vector = self.we.infer(word_tokenize(text))
        return word_vector

    def generate_grammar_features(self, raw_grammar):

        speech_parts = dict(
            nouns=["NN", "NNP", "NNPS", "NNS"],
            verbs=["VB", "VBD", "VBG", "VBN", "VBP", "VBZ"],
            adjectives=["JJ", "JJR", "JJS"],
            adverbs=["RB", "RBR", "RBS"]
        )

        grammar_counts = {}
        for k in speech_parts:
            grammar_counts[k] = 0

        for t in raw_grammar:
            for k in speech_parts:
                if t[1] in speech_parts[k]:
                    grammar_counts[k] += 1
        for k in grammar_counts:
            grammar_counts[k] /= len(raw_grammar)

        return grammar_counts
