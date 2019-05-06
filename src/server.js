var express = require('express');
var app = express();
var bodyparser = require('body-parser');
// var jwt = require('jsonwebtoken');

//Controllers
var dataController = require("./controllers/data-controller.js");

var config = require('./config.js');
config.setConfig();

//mongoose.connect(process.env.MONGOOSE_CONNECT);

app.use(bodyparser.urlencoded({extended: true}));

app.listen(3000, function(){
    console.log('listening on 3000')
});

//API Calls

app.post('/roll', dataController.roll);

