const mqtt = require('mqtt');

var broker = 'mqtt://192.168.1.107:1883';

console.log("iMA6iNE IoT Server Status: \u001B[31mOFFLINE\u001B[0m\nBooting...");

const userMQTT = "oiroamoi";
const passwordMQTT = "J3wsSmC4kV9O";

var server = mqtt.connect(broker);


console.log("Connected to Broker: " + broker);

server.on('connect' , function(){

	server.publish('imaginexyz/listen' , 'iMA6iNE IoT Server Status: ONLINE');
	
	console.log("iMA6iNE IoT Server Status: \u001B[32mONLINE\u001B[0m");
	
	server.subscribe('imaginexyz/listen' , function(){
	
		console.log("iMA6iNE IoT Server Status: \u001B[36mWAITING\u001B[0m on topic imaginexyz/listen");
	
		server.on('message' , function(topic , message , packet){

			console.log("Mensaje on " + topic + ": " + message);

		});
		
	});
	
});

