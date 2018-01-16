const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
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
    history: [{ type: Schema.Types.ObjectId, ref: 'History' }],

});

module.exports = mongoose.model('Users', UserSchema);