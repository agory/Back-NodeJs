let Manga = require('../model/manga');
let app = require('../../app');
let mangaApi = require('../api/manga.api');
//let palmerabollo = require('node-isbn');


let MangaController = {

    getMangaByIsbnApiCall: function(req, res, next) {
        let mangaIsbn = req.params.isbn;

        mangaApi.getMangaByIsbn(mangaIsbn, (err, body) => {
            if (err) {
                res.status(404);
                return res.json({error: 'no manga with such isbn : ' + mangaIsbn, err:e});
            } else {
                res.status(200);
                return res.json(Manga(body));
            }
        });
    },
};

module.exports = MangaController;