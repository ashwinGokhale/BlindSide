import mraa
import time

in1 = mraa.Gpio(33)
in2 = mraa.Gpio(31)
in3 = mraa.Gpio(27)
in4 = mraa.Gpio(23)

in1.dir(mraa.DIR_OUT)
in2.dir(mraa.DIR_OUT)
in3.dir(mraa.DIR_OUT)
in4.dir(mraa.DIR_OUT)

def forward(delay, steps):
    for i in range(0, steps):
        setStep(1, 0, 1, 0)
        time.sleep(delay)
        setStep(0, 1, 1, 0)
        time.sleep(delay)
        setStep(0, 1, 0, 1)
        time.sleep(delay)
        setStep(1, 0, 0, 1)
        time.sleep(delay)

def setStep(w1, w2, w3, w4):
    in1.write(w1)
    in2.write(w2)
    in3.write(w3)
    in4.write(w4)

while True:
    forward(1000, 2048)
