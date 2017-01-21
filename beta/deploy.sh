!#/bin/bash/



mosquitto

echo "Mosquitto [ ok ]"

sudo rm /data/db/mongod.lock

echo "Removed mongod lock"

sudo mongod

echo "MongoDB [ ok ]"

node /Documents/nodeJS_MQTT_IoT_server/server

exho "Server [ ok ]"