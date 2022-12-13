config = {
    'user': 'root',
    'password': 'root',
    'host': 'db',
    'port': '3306',
    'database': 'tasks'
}

    # Check if the username and password are correct
    # conn = mysql.connector.connect(**mysql_config)
    # cur = conn.cursor()
    # cur.execute("SELECT * FROM users WHERE username=%s AND password=%s", (username, password))
    # user = cur.fetchone()
    # cur.close()
    # conn.close()