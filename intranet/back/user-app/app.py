from flask_cors import CORS
from flask import jsonify, request, Flask
import mysql.connector

app = Flask(__name__)
CORS(app)
config = {
    'user': 'root',
    'password': 'root',
    'host': 'db',
    'port': '3306',
    'database': 'intranet'
}


@app.route('/auth', methods=['POST'])
def authenticate():
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    # Temp prints
    print(username, flush=True)
    print(password, flush=True)

    if not username or not password:
        return jsonify({"msg": "Missing username or password parameter"}), 400

    try:
        # Check if the username and password are correct
        conn = mysql.connector.connect(**config)
        cur = conn.cursor()
        cur.execute(
            "SELECT * FROM users WHERE username=%s AND hash=%s", (username, password))
        user = cur.fetchone()
        print(user, flush=True)
        cur.close()
        conn.close()
        return jsonify({'username': username, 'password': password})

    except mysql.connector.Error as error:
        print("Failed to get record from MySQL table: {}".format(error), flush=True)
        return jsonify({'error': 'Failed to authenticate user'}), 500


@app.route('/createUser', methods=['POST'])
def createUser():
    pass


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000, debug=True)
