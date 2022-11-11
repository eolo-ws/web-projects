from flask import Flask,request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def index():
    config = {
        'user': 'root',
        'password': 'root',
        'host': 'db',
        'port': '3306',
        'database': 'tasks'
    }
    data = request.get_json()

    for x in data:
        proc = x['PROC']
        pid = x['PID']
        cpu = x['CPU']
        mem = x['MEM']
        connection = mysql.connector.connect(**config)
        cursor = connection.cursor()
        cursor.execute(''' INSERT INTO procs(proc,pid,cpu,mem) VALUES(%s,%s,%s,%s)''',(proc,pid,cpu,mem))
        connection.commit()

    cursor.close()
    connection.close()
    return 'Posted to MySQL database succesfully!'

@app.route('/header', methods=['POST'])
def postHeader():
    config = {
        'user': 'root',
        'password': 'root',
        'host': 'db',
        'port': '3306',
        'database': 'tasks'
    }
    data = request.get_json()

    proc = data['PROC']
    cpu = data['CPU']
    mem = data['MEM']
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    cursor.execute(''' INSERT INTO header(proc,cpu,mem) VALUES(%i,%f,%f)''',(proc,cpu,mem))
    connection.commit()

    cursor.close()
    connection.close()
    return 'Posted to MySQL database succesfully!'

@app.route('/cpu', methods=['GET'])
def getCpuGraphData():
    config = {
        'user': 'root',
        'password': 'root',
        'host': 'db',
        'port': '3306',
        'database': 'tasks'
    }
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    cursor.execute('SELECT * FROM header')
    
    row_headers=[x[0] for x in cursor.description]
    rv = cursor.fetchall()
    json_data=[]
    for result in rv:
        json_data.append(dict(zip(row_headers,result)))
    
    cursor.close()
    connection.close()

    return jsonify(json_data)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=4000, debug=True)