var mqtt = require('mqtt');
var config = require('./config.json');
var database = require('./services/database');

var broker = config.broker + ':' + config.port;

console.log(config.serverName + " Server Status: \u001B[31mOFFLINE\u001B[0m\nBooting...");


var server = mqtt.connect(broker);


console.log("Connected to Broker: " + '\u001B[33m' + broker + '\u001B[0m');

server.on('connect' , function(){

	server.publish('imaginexyz/server/status' , config.serverName + ' Server Status: ONLINE');

	console.log(config.serverName + ' Server Status: \u001B[32mONLINE\u001B[0m');
	
	server.subscribe('#' , function(){
	
		console.log(config.serverName + ' Server Status: \u001B[34mWAITING\u001B[0m on all topics (\u001B[33m#\u001B[0m)');
	
		server.on('message' , function(topic , message , packet){

			console.log("Message on \u001B[36m" + topic + "\u001B[0m: " + message);
			

		});
		
	});
	
});



