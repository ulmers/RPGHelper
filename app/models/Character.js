var mongoose = require('mongoose');

module.exports = mongoose.model('Character', {
    name: String,
    STR: Number,
    DEX: Number,
    INT: Number,
    WIS: Number,
    CHA: Number,
    CON: Number
});
