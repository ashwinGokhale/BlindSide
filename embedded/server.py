from flask import Flask
import json

app = Flask(__name__)

status = 0

@app.route("/")
def alive():
    return "I am alive!"

@app.route("/data")
def get_data():
    with open('device-config.json', 'w') as config:
        return json.dump(data, config)

@app.route("/openBlind")
def open_blind():
    if status >= 100:
        return 'open'
    for i in range(1, 2048):
        os.system("sh forward.sh")
    status += 10
    return 'success'

@app.route("/closeBlind")
def close_blind():
    if status <= 0:
        return 'closed'
    for i in range(1, 2048):
        os.system("sh backward.sh")
    status -= 10
    return 'success'

@app.route("/openFull")
def open_full():
    if status >= 100:
        return 'open'
    for i in range(1, 10240):
        os.system("sh forward.sh")
    status = 100
    return 'success'

@app.route("/closeFull")
def close_full():
    if status <= 0:
        return 'closed'
    for i in range(1, 10240):
        os.system("sh backward.sh")
    status = 0
    return 'success'
