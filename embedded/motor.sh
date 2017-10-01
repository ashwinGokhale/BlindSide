cd /sys/class/gpio

cd gpio28
echo out > direction
cd ..
cd gpio35
echo out > direction
cd ..
cd gpio115
echo out > direction
cd ..
cd gpio36
echo out > direction
cd ..

cd gpio28
echo 1 > value
cd ..
cd gpio35
echo 0 > value
cd ..
cd gpio115
echo 1 > value
cd ..
cd gpio36
echo 0 > value
cd ..

sleep 0.001

cd gpio28
echo 0 > value
cd ..
cd gpio35
echo 1 > value
cd ..
cd gpio115
echo 1 > value
cd ..
cd gpio36
echo 0 > value
cd ..

sleep 0.001

cd gpio28
echo 0 > value
cd ..
cd gpio35
echo 1 > value
cd ..
cd gpio115
echo 0 > value
cd ..
cd gpio36
echo 1 > value
cd ..

sleep 0.001

cd gpio28
echo 1 > value
cd ..
cd gpio35
echo 0 > value
cd ..
cd gpio115
echo 0 > value
cd ..
cd gpio36
echo 1 > value
cd ..

sleep 0.001
