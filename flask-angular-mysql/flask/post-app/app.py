from flask import Flask,request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

config = {
        'user': 'root',
        'password': 'root',
        'host': 'db',
        'port': '3306',
        'database': 'tasks'
    }

# Saves the data into the table procs in the tasks databes in MySQL
@app.route('/postProcs', methods=['POST'])
def index():
    global config
    data = request.get_json()

    for x in data:
        proc = x['PROC']
        pid = x['PID']
        cpu = x['CPU']
        mem = x['MEM']
        connection = mysql.connector.connect(**config)
        cursor = connection.cursor()
        cursor.execute(''' INSERT INTO procs(process,pid,cpu,mem) VALUES(%s,%s,%s,%s)''',(proc,pid,cpu,mem))
        connection.commit()

    cursor.close()
    connection.close()
    return jsonify({"status":"all-good"})



# Saves the header data into the header table in the tasks table in MySQL
@app.route('/postHeader', methods=['POST'])
def postHeader():
    global config
    data = request.get_json()

    proc = data[0]['PROC']
    cpu = data[0]['CPU']
    mem = data[0]['MEM']

    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    cursor.execute(''' INSERT INTO header(process,cpu,mem) VALUES(%s,%s,%s)''',(proc,cpu,mem))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({"status":"all-good"})



# Fetches the data from the table header from the tasks database and sends it 
@app.route('/getChartData', methods=['GET'])
def getCpuGraphData():
    global config
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