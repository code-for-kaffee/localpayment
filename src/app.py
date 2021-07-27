from flask import Flask, request
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/localpayment_db'

mongo = PyMongo(app)


@app.route('/trx', methods=['GET'])
def get_all_trx():
    return {'status': 200, 'message': 'done'}


@app.route('/trx/newtrx/', methods=['POST'])
def create_new_trx():
    user = request.json['user']
    feature = request.json['feature']
    amount = request.json['amount']

    if user and feature and amount:
        trx_number = mongo.db.trx.insert({
            'user': user,
            'feature': feature,
            'amount': amount
        })
        response = {
            'trx_number': str(trx_number),
            'type': feature,
            'amount': amount,
            'by': user
        }
        return response
    else:
        return {'status': 200, 'message': 'done'}


@app.route('/trx/balance/<user>', methods=['GET'])
def get_all_trx_by_user(user):
    return {'status': 200, 'message': user}


@app.route('/trx/balance/<user>', methods=['DELETE'])
def delete_all_user_records(user):
    return {'status': 200, 'message': user}


if __name__ == "__main__":
    app.run(debug=True)
