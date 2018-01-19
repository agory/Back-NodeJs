let app = require('../../app');
let mangaApi = require('../api/manga.api');
let User = require('../model/user');


let MangaController = {
    getMangaByIsbnApiCall: function(req, res, next) {
        let mangaIsbn = req.params.isbn;

        mangaApi.getMangaByIsbn(mangaIsbn, (err, body) => {
            // exec request
            if (err) {
                res.status(404);
                return res.json({err});
            } else {
                // save request to user
                let user = req.user;

                user.history.push({
                    isbn: mangaIsbn,
                    date: Date.now(),
                });

                user.save(function (err) {
                    if (err) console.log(err);
                    // thats it!
                });

                // response
                res.status(200);
                return res.json(transformMangaFromGoogleApi(body));
            }
        });
    },
};

let transformMangaFromGoogleApi = (googleApiBody) => {

    let volumeInfo = googleApiBody.items[0].volumeInfo;
    let saleInfo = googleApiBody.items[0].saleInfo;
    let isbn;

    if (volumeInfo) {
        let isbn13 = volumeInfo.industryIdentifiers[0] ? volumeInfo.industryIdentifiers[0].identifier : "unknown";
        let isbn10 = volumeInfo.industryIdentifiers[1] ? volumeInfo.industryIdentifiers[1].identifier : "unknown";

        isbn = isbn13 ? isbn13 : isbn10;
    }

    return {
        isbn: isbn,
        retailPrice: {
            amount: saleInfo.retailPrice ? saleInfo.retailPrice.amount : "",
            currencyCode: saleInfo.retailPrice ? saleInfo.retailPrice.currencyCode : "",
        },
        pgaCount: volumeInfo ? volumeInfo.pageCount : "",
        title: volumeInfo ? volumeInfo.title : "",
        subtitle: volumeInfo ? volumeInfo.subtitle : "",
        authors: volumeInfo ? volumeInfo.authors : "",
        publisher: volumeInfo ? volumeInfo.publisher : "",
        publishedDate: volumeInfo ? volumeInfo.publishedDate : "",
        description: volumeInfo ? volumeInfo.description : "",
        imageLinks: {
            smallThumbnail: volumeInfo.imageLinks ? volumeInfo.imageLinks.smallThumbnail : "",
            thumbnail: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : "",
        },
    }
};

module.exports = MangaController;