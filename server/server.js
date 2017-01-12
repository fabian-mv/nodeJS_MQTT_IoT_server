const mqtt = require('mqtt')

const server = mqtt.connect('mqtt://broker.hivemq.com')

server.on('connect' , function(){

	server.publish('server/status' , 'ONLINE')
	
	console.log("iMA6iNE Doorbell Status: ONLINE")
	


})





