from flask import Flask, request, jsonify, Response
from flask_pymongo import PyMongo
from pymongo import MongoClient
from bson import json_util
from bson.objectid import ObjectId
import requests

import json

app = Flask(__name__)

mongo = MongoClient(
    "mongodb://root:root@mongo-server:27017/localpayment_db?authSource=admin")
db = mongo["localpayment_db"]
version = "api/v1"


@app.route(f'/{version}/transactions', methods=['GET'])
def get_all_trx():
    try:
        trxs = mongo.db.localpayment_db.find()
        response = json_util.dumps(trxs)
        return Response(response, mimetype='application/json')
    except:
        return server_error()


@app.route(f'/{version}/transactions', methods=['POST'])
def create_new_trx():
    try:
        if not request.json['user'] and request.json['feature'] and request.json['amount']:
            return bad_request("please check the json")

        user = request.json['user']
        feature = request.json['feature']
        amount = request.json['amount']

        req = requests.get(
            f'http://localpayment_node_app_1:3000/{version}/user/{user}')

        if req:
            if feature != 'PAYIN' and feature != 'PAYOUT':
                return bad_request("only PAYIN or PAYOUT allowed as feature")
            if user and feature and amount:
                trx = mongo.db.localpayment_db.insert({
                    'user': user,
                    'feature': feature,
                    'amount': amount
                })
                response = jsonify({
                    'trx_number': str(trx),
                    'type': feature,
                    'amount': amount,
                    'by': user
                })
                response.status_code = 201
                return response
            else:
                return bad_request("something is missing, please check the JSON format")
        else:
            return not_found("user doesn't exist")
    except:
        return server_error()


@app.route(f'/{version}/transactions/balance/<user>', methods=['GET'])
def get_all_trx_by_user(user):
    try:
        req = requests.get(
            f'http://localpayment_node_app_1:3000/{version}/user/{user}')

        if req:
            user_data = mongo.db.localpayment_db.find({'user': int(user), })
            balance = 0
            for data in user_data:
                balance += data['amount']
            response = {
                "user": user,
                "balance": float("{:.2f}".format(balance))
            }
            return response
        else:
            return not_found("user doesn't exist")
    except:
        return server_error()


@app.route(f'/{version}/transactions/<id>', methods=['DELETE'])
def delete_all_user_records(id):
    try:
        mongo.db.localpayment_db.delete_one({'_id': ObjectId(id)})
        response = jsonify({'message': 'transaction ' +
                            id + ' Deleted Successfully'})
        response.status_code = 200
        return response
    except:
        return server_error()


@app.errorhandler(404)
def not_found(text):
    message = {
        'message': f'Resource Not Found, {text} ',
        'status': 404
    }
    response = jsonify(message)
    response.status_code = 404
    return response


@app.errorhandler(400)
def bad_request(text):
    message = {
        'message': f'Incomplete request, {text}!',
        'status': 400
    }
    response = jsonify(message)
    response.status_code = 400
    return response


@app.errorhandler(500)
def server_error():
    message = {
        'message': 'Unkown error, please try again later',
        'status': 500
    }
    response = jsonify(message)
    response.status_code = 500
    return response


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
