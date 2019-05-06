var mongoose = require('mongoose');
var rn = require('random-number');

var Character = require('../models/Character');

// mongoose.connection.on('open', function(){
//
// });

var gen = rn.generator();

// CREATE

// READ
module.exports.helloWorld = (req, res) => {
    res.send('Hello World!');
};
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

// DELETE
