var mqtt = require('mqtt');

var broker = 'mqtt://broker.mqttdashboard.com';

console.log("Client Status: \u001B[31mOFFLINE\u001B[0m\nBooting...");

var client  = mqtt.connect(broker);

console.log("Connected to Broker: " + broker);


client.on('connect', function () {
  client.subscribe('server/status');
  
  client.publish('server/status', 'Client Connected');
  
  console.log("Client Status: \u001B[32mONLINE\u001B[0m");
  
  client.subscribe('server/status' , function(){
	
		console.log("Client Status: \u001B[36mWAITING\u001B[0m");
	
		client.on('message' , function(topic , message , packet){

			console.log("Mensaje on " + topic + ": " + message);

		});
		
	});
  
});