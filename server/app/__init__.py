from flask import Flask, request
from config import Config
from flask_restful import Resource, Api, reqparse
import base64

from .scorer import Scorer

app = Flask(__name__)
app.config.from_object(Config)
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('text')


class HelloWorld(Resource):
    def get(self):
        return {'status': 'active'}


class EssayScorer(Resource):

    def post(self):
        prompt = 1
        text = request.json['text']
        decoded_text = base64.b64decode(text).decode('utf-8')
        #decoded_text = "I think computers are good because you can talk to your friends and family on the computers. People needs computers to look for a job. Some people spend to much time on the computers then on homework people need to stop."
        scorer = Scorer()
        score = scorer.infer(prompt, decoded_text)

        return {
            'result': True,
            'text': 'teste',
            'score': round(score, 1)
        }


api.add_resource(EssayScorer, '/score')
api.add_resource(HelloWorld, '/')
