const mqtt = require('mqtt');
var config = require('./config.json');

var broker = config.broker + ':' + config.port;

console.log(config.serverName + " Server Status: \u001B[41mOFFLINE\u001B[0m\nBooting...");


var server = mqtt.connect(broker);


console.log("Connected to Broker: " + '\u001B[33m' + broker + '\u001B[0m');

server.on('connect' , function(){

	server.publish('imaginexyz/listen' , config.serverName + ' Server Status: ONLINE');
	
	console.log(config.serverName + ' Server Status: \u001B[42mONLINE\u001B[0m');
	
	server.subscribe('imaginexyz/listen' , function(){
	
		console.log(config.serverName + ' Server Status: \u001B[44mWAITING\u001B[0m on topic \u001B[533mimaginexyz/listen\u001B[0m');
	
		server.on('message' , function(topic , message , packet){

			console.log("Mensaje on " + topic + ": " + message);

		});
		
	});
	
});



