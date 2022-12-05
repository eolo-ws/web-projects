from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS
from hashlib import sha256

app = Flask(__name__)
CORS(app)

config = {
    'user': 'root',
    'password': 'root',
    'host': 'db',
    'port': '3306',
    'database': 'tasks'
}


def auth(passwd, usernm):
    global config
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    token = False
    try:
        select_stmt = "SELECT * FROM users WHERE username = %(username)s"
        cursor.execute(select_stmt, {'username': usernm})
        token = True
    except:
        cursor.close()
        connection.close()
        return False

    if token == True:
        select_stmt = "SELECT * FROM users WHERE password = %(password)s"
        cursor.execute(select_stmt, {'password': passwd})
        cursor.close()
        connection.close()
        return True
    else:
        return False


def hashpw(passwd):
    salt = uuid.uuid4().hex
    return sha256(salt.encode() + passwd.encode()).hexdigest() + ':' + salt


@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    
    return jsonify({'username':username,'password':password})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000, debug=True)
