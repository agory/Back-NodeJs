const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let HistorySchema = new Schema({
    history: {
        isbn:  {
            type: String,
            required: true
        },
        date: Date,
    }
});

let UserSchema = new Schema({
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
    history: [HistorySchema],

});

module.exports = mongoose.model('History', HistorySchema);
module.exports = mongoose.model('Users', UserSchema);