var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MangaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: "the isbn must be unique"
    },

});

module.exports = mongoose.model('Mangas', MangaSchema);