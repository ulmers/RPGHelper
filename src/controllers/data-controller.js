var mongoose = require('mongoose');
var rn = require('random-number');
var request = require('request');

var Character = require('../models/Character');

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
            if(i != 0)
                sResult += '+';

            var num = gen(1, args[1], true);

            sum += num;

            sResult += num;
        }

        sResult += ') = ' + sum + '\n';

        grandTotal += sum;
    });

    sResult += 'Total: ' + grandTotal


    var responseJSON ={
        response_type: 'in_channel',
        text: sResult
    };

    res.send(responseJSON);
};

module.exports.oauth = (req, res) => {

    if(req.originalUrl.contains('slack.com'))
    {
        res.status(302);
        res.send()
    }
    request.post(
        {
            uri: 'https://slack.com/api/oauth.access',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: {
                client_id: '615403106003.620521868369',
                client_secret: 'f700f2c409f0ea70b944a4e2c683efe3',

            }
        }

    )

};
