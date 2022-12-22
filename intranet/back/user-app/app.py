from flask_cors import CORS
from flask import jsonify, request, Flask
import mysql.connector
import hashlib

app = Flask(__name__)
CORS(app)
config = {
    'user': 'root',
    'password': 'root',
    'host': 'db',
    'port': '3306',
    'database': 'intranet'
}


@app.route('/user/auth', methods=['POST'])
def authUserData():
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if not username or not password:
        return jsonify({"msg": "Missing username or password parameter"}), 400

    try:
        # Check if the username and password are correct
        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()
        cursor.execute(
            "SELECT * FROM users WHERE username=%s AND hash=%s", (username, password))
        user = cursor.fetchone()
        print(user, flush=True)
        cursor.close()
        conn.close()
        return jsonify({'username': username, 'password': password})

    except mysql.connector.Error as error:
        print("Failed to get record from MySQL table: {}".format(error), flush=True)
        return jsonify({'error': 'Failed to authenticate user'}), 500


@app.route('/user/read', methods=['GET'])
def readUserData():
    try:
        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, username, level FROM users")
        row_headers = [x[0] for x in cursor.description]
        rv = cursor.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))
        cursor.close()
        conn.close()
        return json_data
    except mysql.connector.Error as error:
        print("Failed to get record from MySQL table: {}".format(error), flush=True)
        return jsonify({'error': 'Failed to get user data'}), 500


@app.route('/user/create', methods=['POST'])
def createUserData():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    level = request.json.get('level', None)

    print(username, flush=True)
    print(password, flush=True)
    print(level, flush=True)
    print(type(level), flush=True)

    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    print(hashed_password, flush=True)
    print(type(hashed_password), flush=True)
    print((username, hashed_password, level), flush=True)

    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()
    if user is not None:
        # Return an error if the user already exists
        return jsonify({"error": "user already exists"}), 400

    try:
        cursor.execute(
            "INSERT INTO users(username,hash,level) VALUES(%s,%s,%s)", (username, hashed_password, level))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"status": "all-good"})
    except mysql.connector.Error as error:
        print("Failed to get record from MySQL table: {}".format(error), flush=True)
        return jsonify({'error': 'Failed to get user data'}), 500


@app.route('/user/delete', methods=['POST'])
def deleteUserData():
    username = request.json.get('username', None)
    print(username, flush=True)

    if not username:
        return jsonify({"msg": "Missing username parameter"}), 400

    try:
        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()
        cursor.execute("DELETE FROM users WHERE username = %s", [username])
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"status": "deleted"})
    except mysql.connector.Error as error:
        print("Failed to get record from MySQL table: {}".format(error), flush=True)
        return jsonify({'error': 'Failed to get user data'}), 500


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000, debug=True)
