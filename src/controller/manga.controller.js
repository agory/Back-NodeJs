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
                return res.json(transformMangaFromGoogleApi(body));
            }
        });
    },
};

let transformMangaFromGoogleApi = (googleApiBody) => {

    let isbn13 = googleApiBody.items[0].volumeInfo.industryIdentifiers[0].identifier;
    let isbn10 = googleApiBody.items[0].volumeInfo.industryIdentifiers[1].identifier;

    return {
        isbn: isbn13 ? isbn13 : isbn10,
        retailPrice: {
            amount: googleApiBody.items[0].saleInfo.retailPrice.amount,
            currencyCode: googleApiBody.items[0].saleInfo.retailPrice.currencyCode,
        },
        pgaCount: googleApiBody.items[0].volumeInfo.pageCount,
        title: googleApiBody.items[0].volumeInfo.title,
        subtitle: googleApiBody.items[0].volumeInfo.subtitle,
        authors: googleApiBody.items[0].volumeInfo.authors,
        publisher: googleApiBody.items[0].volumeInfo.publisher,
        publishedDate: googleApiBody.items[0].volumeInfo.publishedDate,
        description: googleApiBody.items[0].volumeInfo.description,
        imageLinks: {
            smallThumbnail: googleApiBody.items[0].volumeInfo.imageLinks.smallThumbnail,
            thumbnail: googleApiBody.items[0].volumeInfo.imageLinks.thumbnail,
        },
    }
};

module.exports = MangaController;