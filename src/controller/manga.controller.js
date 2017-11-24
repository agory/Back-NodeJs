let Manga = require('../model/manga');
let app = require('../../app');
let mangaApi = require('../api/manga.api');

let daotodto = (manga) => {
    return {
        isbn: manga._id,
        name: manga.name,
    }
};

let dtotodao = (manga) => {
    return {
        _isbn: manga.isbn,
        name: manga.name,
    }
};

let MangaController = {
    getAllmangas: function (req, res) {
        res.status(418 || 501).json({message: 'I’m a teapot'})
    },

    getMangaByName: function (req, res) {
        res.status(500).json(daotodto(req.manga));
    },

    getMangaByIsbnApiCall: function(req, res, next) {
        let mangaIsbn = req.params.isbn;

        let response = mangaApi.getMangaByIsbn(req, res, next);

        if (response.ok) {
            res.status(200);
            res.json(response.body);
        } else {
            res.status(404);
            res.json({error: 'no manga with such isbn : ' + mangaIsbn})
        }
    },

};

module.exports = MangaController;