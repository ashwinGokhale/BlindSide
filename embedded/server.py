from flask import Flask
import json
import os
import sys

app = Flask(__name__)

@app.route("/")
def alive():
    return "I am alive!"

@app.route("/data")
def get_data():
    with open('device-config.json', 'w') as config:
        return json.dump(data, config)

@app.route("/openBlind")
def open_blind():
    for i in range(1, 2048):
        os.system("sh forward.sh")
    return 'success'

@app.route("/closeBlind")
def close_blind():
    for i in range(1, 2048):
        os.system("sh backward.sh")
    return 'success'

@app.route("/openFull")
def open_full():
    for i in range(1, 10240):
        os.system("sh forward.sh")
    return 'success'

@app.route("/closeFull")
def close_full():
    for i in range(1, 10240):
        os.system("sh backward.sh")
    return 'success'
