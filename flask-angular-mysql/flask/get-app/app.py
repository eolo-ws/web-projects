from flask import Flask
from flask_cors import CORS

from header import getHeader
from proc import getProcs

app = Flask(__name__)
CORS(app)

@app.route("/header")
def getH():
    return getHeader()

@app.route("/procs")
def getP():
    return getProcs()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)