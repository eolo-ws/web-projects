from flask import Flask,request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def auth(passwd):
    pass

def hash(passwd):
    pass

@app.route('/pwd', methods=['POST'])
def getPass():
    pass


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=4000, debug=True)