import os
import gensim
import smart_open

DATA_PATH = './server/app/scorer/models/'
CORPUS_FILENAME = 'big.txt'
MODEL_FILENAME = 'doc2vec.model'


class WordEmbeddings(object):
    def __init__(self, vector_size=50, min_count=2, epochs=40, model_path=DATA_PATH):
        self.data_path = os.path.abspath(
            os.path.join(DATA_PATH, CORPUS_FILENAME))
        self.train_corpus = list(self.read_corpus(self.data_path))
        self.model_path = model_path
        self.model = gensim.models.doc2vec.Doc2Vec(
            vector_size=vector_size, min_count=min_count, epochs=epochs)

    def read_corpus(self, fname, tokens_only=False):
        with smart_open.open(fname, encoding="iso-8859-1") as f:
            for i, line in enumerate(f):
                tokens = gensim.utils.simple_preprocess(line)
                if tokens_only:
                    yield tokens
                else:
                    # For training data, add tags
                    yield gensim.models.doc2vec.TaggedDocument(tokens, [i])

    def build_vocab(self, train_corpus=None):
        if train_corpus:
            self.model.build_vocab(train_corpus)
        else:
            self.model.build_vocab(self.train_corpus)

    def load_model(self, model_path=None):
        if model_path:
            self.model = gensim.models.doc2vec.Doc2Vec.load(
                os.path.join(model_path, MODEL_FILENAME))
        elif self.model_path:
            self.model = gensim.models.doc2vec.Doc2Vec.load(
                os.path.join(self.model_path, MODEL_FILENAME))

    def train(self, train_corpus=None, save=True):
        self.build_vocab(train_corpus)
        self.model.train(
            self.train_corpus, total_examples=self.model.corpus_count, epochs=self.model.epochs)
        if save:
            self.model.save(os.path.join(self.model_path, MODEL_FILENAME))

    def infer(self, vector):
        return self.model.infer_vector(vector)
