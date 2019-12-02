var mongoose = require('mongoose');

//Requirering all the models
require('../models/course');
require('../models/user');


//set up default mongoose connection
var mongoDB = 'mongodb://localhost/test';
mongoose.connect(mongoDB);
console.log('gucci gang');
//get the default connection
var db = mongoose.connection;
//console.log('###############################################################');
//console.log(db);
db.on('error',console.error.bind(console, 'MongoDB connection error'));
