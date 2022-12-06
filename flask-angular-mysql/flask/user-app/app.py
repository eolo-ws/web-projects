from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app,support_credentials=True)

config = {
    'user': 'root',
    'password': 'root',
    'host': 'db',
    'port': '3306',
    'database': 'tasks'
}

@app.route('/auth', methods=['POST'])
def auth():
    # if not request.is_json:
    #     return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)
    # if not username:
    #     return jsonify({"msg": "Missing username parameter"}), 400
    # if not password:
    #     return jsonify({"msg": "Missing password parameter"}), 400
    
    # Check if the username and password are correct
    # conn = mysql.connector.connect(**mysql_config)
    # cur = conn.cursor()
    # cur.execute("SELECT * FROM users WHERE username=%s AND password=%s", (username, password))
    # user = cur.fetchone()
    # cur.close()
    # conn.close()


    return jsonify({'username':username,'password':password})

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3000, debug=True)
