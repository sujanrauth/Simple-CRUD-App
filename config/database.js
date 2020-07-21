const mongoose = require('mongoose');

module.exports = function (){

mongoose.connect('mongodb://localhost/simpleCRUD',(err)=>{
        if(err){
            throw err;
        }
        else {
            console.log("connected to the database");
        }
});

// mongoose.connection.on('connected', function(){
//     console.log(connected("Mongoose default connection is open to ", dbURL));
// });

// mongoose.connection.on('error', function(err){
//     console.log(error("Mongoose default connection has occured "+err+" error"));
// });

}