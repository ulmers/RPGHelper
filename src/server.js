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

var port = process.env.PORT || 80;

app.listen(port, function(){
    console.log('listening on ' + port)
});

//API Calls

app.post('/roll', dataController.roll);

app.post('/oauth', dataController.oauth);
