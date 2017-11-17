var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: "the email must be unique"
    },
    password: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('Users', UserSchema);