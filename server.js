const mqtt = require('mqtt');

var broker = 'mqtt://broker.mqtt-dashboard.com/';
//var broker = 'mqtt://localhost:1883';

console.log("iMA6iNE IoT Server Status: \u001B[31mOFFLINE\u001B[0m\nBooting...");

const server = mqtt.connect(broker);

console.log("Connected to Broker: " + broker);

server.on('connect' , function(){

	server.publish('server/status' , 'iMA6iNE IoT Server Status: ONLINE');
	
	console.log("iMA6iNE IoT Server Status: \u001B[32mONLINE\u001B[0m");
	
	server.subscribe('server/status' , function(){
	
		console.log("iMA6iNE IoT Server Status: \u001B[36mWAITING\u001B[0m on topic server/status");
	
		server.on('message' , function(topic , message , packet){

			console.log("Mensaje on " + topic + ": " + message);

		});
		
	});
	
});



