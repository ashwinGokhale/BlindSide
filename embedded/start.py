import os
import sys
import requests
import time
import uuid

os.system("./ngrok http 8080 -log stdout &")

time.sleep(1)

r = requests.get('http://127.0.0.1:4040/api/tunnels')

uri = r.json()['tunnels'][0]['public_url']

id = uuid.uuid4()

r = requests.post('https://secret-journey-73941.herokuapp.com/device/register', data={'link':uri, 'id':id})

print(r)
