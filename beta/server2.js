/*
                 _   _                                  
                | | | |                                 
 _ __ ___   __ _| |_| |_    ___  ___ _ ____   _____ _ __ 
| '_ ` _ \ / _` | __| __|  / __|/ _ \ '__\ \ / / _ \ '__|
| | | | | | (_| | |_| |_   \__ \  __/ |   \ V /  __/ |   
|_| |_| |_|\__, |\__|\__|  |___/\___|_|    \_/ \___|_|   
              | |                                       
              |_|                                       

			  Server MQTT escrito en NODE.js para IoT


@author Fabian Montero

*/



var mqtt = require('mqtt');							//importa mqtt
var config = require('./config.json');				//carga la configuracion de ./config.json
var database = require('./services/database');		//importa las funciones de la base de datos

var broker = config.broker + ':' + config.port;		//declara el broker usando la informacion del archivo de informacion

console.log(config.serverName + " Server Status: \u001B[31mOFFLINE\u001B[0m\nBooting...");		//imprime que el servidor esta fuera de linea


var server = mqtt.connect(broker);		//intenta conectarse al broker


console.log("Connected to Broker: " + '\u001B[33m' + broker + '\u001B[0m');		//si logra conectarse, imprime que el servidor esta en linea

server.on('connect' , function(){

	server.publish('imaginexyz/iotserver/status' , config.serverName + ' Server Status: ONLINE');		//publica en el topic de status que esta en linea

	console.log(config.serverName + ' Server Status: \u001B[32mONLINE\u001B[0m');		//si logra publicar en el topic de status, imprime que el servidor esta en linea
	
	server.subscribe('#' , function(){
	
		console.log(config.serverName + ' Server Status: \u001B[34mWAITING\u001B[0m on all topics (\u001B[33m#\u001B[0m)');			//imprime que esta esperando mensajes en el servidor
	
		server.on('message' , function(topic , message , packet){		//lo que pasa si llega un mensaje

			console.log("Message on \u001B[36m" + topic + "\u001B[0m: " + message);			//imprime el mensaje y el topic
			
			database.updateMessageLog(topic , message , packet);		//guarda el mensaje en la base de datos
			

		});
		
	});
	
});