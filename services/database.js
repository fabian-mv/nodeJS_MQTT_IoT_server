var mongo = require('mongodb');
var db;


mongo.MongoClient.connect('mongodb://localhost:27017/iot' , function(err , database) {
    if(!err) {
        db = database; //Instancia de la base de datos
        
        console.log('.\n.\n.\n.\n"iot" Database Status: \u001B[32mACTIVE\u001B[0m \n');
    }
    else{
        console.log(404, '\u001B[31mError Connecting to the "iot" database\u001B[0m');
    }
});


