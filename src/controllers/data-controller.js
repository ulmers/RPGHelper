//var mongoose = require('mongoose');
var rn = require('random-number');
var request = require('request');

//var Character = require('../models/Character');

// mongoose.connection.on('open', function(){
//
// });

var gen = rn.generator();

module.exports.roll = (req, res) => {

    console.log('rolling...');

    var command = req.body.text;

    console.log(command);

    var sResult = '';

    var grandTotal = 0;

    command.split('+').forEach(roll => {
        roll = roll.trim();

        var args = roll.split('d');

        var sum = 0;

        sResult += roll + ': (';

        for(var i = 0; i < args[0]; i++)
        {
            if(i !== 0)
                sResult += '+';

            var num = gen(1, args[1], true);

            sum += num;

            sResult += num;
        }

        sResult += ') = ' + sum + '\n';

        grandTotal += sum;
    });

    sResult += 'Total: ' + grandTotal;


    var responseJSON ={
        response_type: 'in_channel',
        text: sResult
    };

    res.send(responseJSON);
};

module.exports.oauth = (req, res) => {

    var host = req.ip;

    console.log('host: ' + host);

    console.log('code: ' + req.query.code);

    if(host.includes('slack.com'))
    {
        res.status(302).end()
    }

    var options = {
        uri: 'https://slack.com/api/oauth.access?code='
            +req.query.code+
            '&client_id='+process.env.CLIENT_ID+
            '&client_secret='+process.env.CLIENT_SECRET+
            '&redirect_uri='+process.env.REDIRECT_URI,
        method: 'GET'
    };

    request(options, (error, response, body) => {
        var JSONresponse = JSON.parse(body);
        if (!JSONresponse.ok){
            console.log(JSONresponse);
            res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end();
        }else{
            console.log(JSONresponse);
            res.send("Success!");
        }
    });

};
