def createUser():
    pass


def deleteUser():
    pass


def updateUser():
    pass


def readUser():
    try:
        # Check if the username and password are correct
        conn = mysql.connector.connect(**config)
        cur = conn.cursor()
        cur.execute(
            "SELECT id, username, level FROM users")
        row_headers = [x[0] for x in cursor.description]
        rv = cursor.fetchall()
        json_data = []
        for result in rv:
            json_data.append(dict(zip(row_headers, result)))
        cur.close()
        conn.close()
        print(jsonify(json_data), flush=True)
        return jsonify(json_data)
    except mysql.connector.Error as error:
        print("Failed to get record from MySQL table: {}".format(error), flush=True)
        return jsonify({'error': 'Failed to authenticate user'}), 500
