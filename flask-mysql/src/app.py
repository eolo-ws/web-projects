from typing import List, Dict
from flask import Flask, jsonify,render_template, request
import mysql.connector
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


def cats() -> List[Dict]:
    config = {
        'user': 'root',
        'password': 'root',
        'host': 'db',
        'port': '3306',
        'database': 'pets'
    }
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    cursor.execute('SELECT name, owner FROM cats')
    results = [{name: owner} for (name, owner) in cursor]
    cursor.close()
    connection.close()

    return results



@app.route('/')
def index() -> str:
    return jsonify(cats())


@app.route('/form')
def form():
    return render_template('form.html')


@app.route('/login', methods=['POST', 'GET'])
def login():
    config = {
        'user': 'root',
        'password': 'root',
        'host': 'db',
        'port': '3306',
        'database': 'pets'
    }
    if request.method == 'GET':
        return "Login via the login Form"

    if request.method == 'POST':
        name = request.form['name']
        owner = request.form['owner']
        birth = request.form['birth']
        connection = mysql.connector.connect(**config)
        cursor = connection.cursor()

        cursor.execute(''' INSERT INTO cats(name,owner,birth) VALUES(%s,%s,%s)''',(name,owner,birth))
        connection.commit()
        cursor.close()
        connection.close()
    return f"Done!!"


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)