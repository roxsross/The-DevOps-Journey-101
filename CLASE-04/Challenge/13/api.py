from flask import Flask, jsonify, request
from pymongo import MongoClient
app = Flask(__name__)

client = MongoClient('mongodb://mongodb:27017/')
db = client.test_database

@app.route('/')
def hello_world():
    return "Hello world!"

@app.route('/users')
def users():
    collection = db.users.find()

    item = {}
    data = []
    for element in collection:
        item = {
            'id': str(element['_id']),
            'name': element['name'],
            'lastname': element['lastname']
        }
        data.append(item)

    return jsonify(
        data=data
    )

@app.route('/user')
def user():
    name = request.args.get('name')
    lastname = request.args.get('lastname')
    user = {
        'name': name,
        'lastname': lastname
    }
    db.users.insert_one(user)

    return 'Saved!', 201