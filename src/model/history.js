const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let HistorySchema = new Schema({
    history: {
        isbn:  {
            type: String,
            required: true
        },
        date: Date
    }
});

module.exports = mongoose.model('History', HistorySchema);