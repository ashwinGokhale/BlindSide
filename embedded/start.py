from urllib2 import urlopen
ip = urlopen('http://ip.42.pl/raw').read()
print ip
