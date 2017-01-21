/*
                                          _       _        _                    
                                         | |     | |      | |                   
  _ __ ___   ___  _ __   __ _  ___     __| | __ _| |_ __ _| |__   __ _ ___  ___ 
 | '_ ` _ \ / _ \| '_ \ / _` |/ _ \   / _` |/ _` | __/ _` | '_ \ / _` / __|/ _ \
 | | | | | | (_) | | | | (_| | (_) | | (_| | (_| | || (_| | |_) | (_| \__ \  __/
 |_| |_| |_|\___/|_| |_|\__, |\___/   \__,_|\__,_|\__\__,_|_.__/ \__,_|___/\___|
                         __/ |                                                  
                        |___/                                                                                          

				Base de datos mongo para el mqtt Server


@author Fabian Montero

*/


var mongo = require('mongodb');		//importa mongo
var config = require('./config.json');		//carga la configuracion de ./config.json

var db = config.databaseName;

mongo.MongoClient.connect('mongodb://localhost:27017/' + db , function(err , database) {	//intenta conexion con el host de la base de datos (localhost)
    if(!err) {
        db = database; //Instancia de la base de datos
        
        console.log('.\n.\n.\n.\n"' + db + '" Database Status: \u001B[32mACTIVE\u001B[0m \n');		//imprime que la base de datos esta activa
        
    }
    else{
        console.log('\u001B[31mError Connecting to the "' + db + '" database\u001B[0m');	//si la conexion falla, imprime que hubo un error conectandose
    }
});


//ANIADE UN MENSAJE AL MESSAGELOG (coleccion de mensajes)
exports.updateMessageLog = function(topic , message , packet){

	//intenta extraer el mensaje recibido como si fuera un json
	try{
		var cleanMsg = JSON.parse(message);
	}
	catch(e)
	{
	  	var cleanMsg = ''+message; //si no es un json, simplemente lo interpreta como una string
	}
	
	db.collection('messages').insertOne({	//aniade el mensaje recibido al messagelog
	
		TOPIC : topic ,
		MESSAGE : cleanMsg ,
		PACKET : packet
		
	});
	
	console.log('Message stored in database at: ' + config.messagesCollection +'\n' + packet);	//imprime el mensaje y que ya lo guardo en la base de datos

}





