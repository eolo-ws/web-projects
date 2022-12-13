from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS
import jwt
import crypto
import datetime


private_key = crypto.generate_private_key(crypto.TYPE_RSA, 2048)
public_key = crypto.dump_publickey(crypto.FILETYPE_PEM, private_key)

config = {
    'user': 'root',
    'password': 'root',
    'host': 'db',
    'port': '3306',
    'database': 'tasks'
}


app = Flask(__name__)
CORS(app, support_credentials=True)


@app.route('/auth', methods=['POST'])
def auth():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if not username or not password:
        return jsonify({"msg": "Missing username or password parameter"}), 400

    # Check the username and password against the database
    mydb = mysql.connector.connect(
        host=config['host'],
        user=config['user'],
        passwd=config['password'],
        database=config['database'],
        port=config['port']
    )

    mycursor = mydb.cursor()
    mycursor.execute(
        "SELECT * FROM users WHERE username = %s and password = %s", (username, password))
    users = mycursor.fetchall()
    if len(users) == 0:
        return jsonify({"msg": "Invalid username or password"}), 401

    # Generate a JWT token and return it to the client
    user = users[0]
    expiration_time = datetime.datetime.now() + datetime.timedelta(weeks=12)
    payload = {
        "username": user[0],
        "password": user[1],
        "exp": expiration_time
    }
    token = jwt.encode(payload, private_key, algorithm="RS256")
    return jsonify({'token': token.decode('utf-8'), 'public_key': public_key})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000, debug=True)
