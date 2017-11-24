let Manga = require('../model/manga');
let app = require('../../app');
let mangaApi = require('../api/manga.api');
let palmerabollo = require('node-isbn');

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

        mangaApi.getMangaByIsbn(mangaIsbn, (err, body) => {
            if (err) {
                res.status(404);
                return res.json({error: 'no manga with such isbn : ' + mangaIsbn, err:e});
            } else {
                res.status(200);
                return res.json(body);
            }
        });
    },
};

module.exports = MangaController;