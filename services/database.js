var mongo = require('mongodb');
var iotdb;



mongo.MongoClient.connect('mongodb://localhost:27017/iotdb' , function(err , database) {
    if(!err) {
        iotdb = database; //Instancia de la base de datos
        
        console.log('.\n.\n.\n.\n"iotdb" Database Status: \u001B[32mACTIVE\u001B[0m \n');
        
    }
    else{
        console.log('\u001B[31mError Connecting to the "iotdb" database\u001B[0m');
    }
});



//ANIADE UN MENSAJE AL MESSAGELOG
exports.updateMessageLog = function(topic , message , packet){

	try{
		var cleanMsg = JSON.parse(message);
	}
	catch(e)
	{
	  	var cleanMsg = ''+message;
	}
	
	iotdb.collection('messages').insertOne({
	
		TOPIC : topic ,
		MESSAGE : cleanMsg ,
		PACKET : packet
		
	});
}





