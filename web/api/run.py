from flask import Flask
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)

class Message(Resource):
    def get(self):
        return {"message": 'Hello World'}

api.add_resource(Message, '/v1/hello')

if __name__ == '__main__':
    app.run(debug=True)