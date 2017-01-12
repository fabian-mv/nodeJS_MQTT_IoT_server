var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.hivemq.com')
 
client.on('connect', function () {
  client.subscribe('server/status')
  client.publish('server/status', 'Client Connected')
})
 
 
client.on('message', function (topic, message) {
  console.log(message.toString())
  client.end()
})


client.subscribe('server/status', function() {
	client.on('message', function(topic, message, packet) {
		var fullMessage = '' + message + '';
      		server.publish('server/status', fullMessage);
        	console.log(message + "' recibido en el tema: '" + topic + "'");
        
    })
})