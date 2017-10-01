cd /sys/class/gpio
echo 36 > export
echo 115 > export
echo 35 > export
echo 28 > export

cd /home/linaro/boilermake/embedded

python start.py

export FLASK_APP=server.py
flask run
