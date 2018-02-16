let app = require('../../app');
let mangaApi = require('../api/manga.api');
let User = require('../model/user');

const mangaedenImagesBaseUrl = 'http://cdn.mangaeden.com/mangasimg/';

let MangaController = {
    getMangaByIsbnApiCall: async function(req, res, next) {
        let mangaIsbn = req.params.isbn;
        try {
            const body = await mangaApi.getMangaByIsbn(mangaIsbn);
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
        } catch (err) {
            res.status(404);
            return res.json({err});
        }
    },
    getMangaHistory: async function (req, res) {
        const books =  [];
        const isbnKnow = [];
        for(const item of req.user.history ){
            if(!isbnKnow.includes(item.isbn)) {
                try {
                    const body = await mangaApi.getMangaByIsbn(item.isbn);
                    const book = transformMangaFromGoogleApi(body);
                    books.push({date:item.date , book });
                    isbnKnow.push(item.isbn);
                    if(!isbnKnow.includes(book.isbn)) {
                        isbnKnow.push(book.isbn)
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }
        res.status(200);
        return res.json(books.sort((book1,book2) => new Date(book2.date) - new Date(book1.date)));
    },

    getMangaChaptersApiCall: async function (req, res) {
        let mangaIsbn = req.params.isbn;
        try {
            // get manga from Google -- api call
            const bodyGoogle = await mangaApi.getMangaByIsbn(mangaIsbn);

            // format response
            const googleManga = transformMangaFromGoogleApi(bodyGoogle);

            // check if mangaeden's manga id is already known - database call history (need to add id to schema)
            // TODO : optimisation - speed up by reducing requests

            // if not get manga list info - api call
            const bodyAllList = await mangaApi.getAllMangaedenManga();

            // transform and clear result
            const mangaedenAllList = transformMangaListfromMangaEden(bodyAllList);

            // compare manga.title to mangaedenAllList|].mangaTitle
            const id = getMangaedenIdFromList(googleManga.title, mangaedenAllList);

            // save found mangaeden id to database - database call
            // TODO : optimisation

            // get manga from mangaeden with id - api call
            const mangaedenManga = await mangaApi.getMangaByIdMangaeden(id);

            // response
            res.status(200);

            let resJson = transformMangafromMangaEden(mangaedenManga);
            resJson.title = googleManga.title.substring(0, googleManga.title.lastIndexOf(" ")); // mangaEden titles are sometimes amiss
            return res.json(resJson);
        } catch (err) {
            res.status(404);
            return res.json({err});
        }
    },
    getMangaScanListApiCall: async function (req, res) {
        let chapterId = req.params.chapterId;
        try {
            // get scans from Manga Eden- api call
            const body = await mangaApi.getScansByChapterMangaeden(chapterId);

            // response
            res.status(200);
            return res.json(transformChapterfromMangaEden(body));
        } catch (err) {
            res.status(404);
            return res.json({err});
        }
    }
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

let transformMangaListfromMangaEden = (mangaEdenApiBody) => {
    let liste = mangaEdenApiBody.manga;

    let resListe = [];

    for (let manga of liste) {
        resListe.push(
            {
                id: manga.i,
                title_cleaned: manga.a,
            }
        )
    }

    return resListe;
};

let getMangaedenIdFromList = (googleMangaName, mangaedenListe) => {
    // clean google manga's name - trim, lowercase, met des - à la place des espaces
    let googleMangaNameCleaned = googleMangaName.trim().toLowerCase().split(' ').join('-');

    // first search - should do the trick most of the time
    for (let manga of mangaedenListe) {
        if (googleMangaNameCleaned === manga.title_cleaned) {
            console.log('Found specific manga from MangaEden List ! ' + manga.id);
            return manga.id;
        }
    }

    // remove last word - in case of : 'one-piece-74' -> 'one-piece'
    googleMangaNameCleaned = googleMangaNameCleaned.substring(0, googleMangaNameCleaned.lastIndexOf("-"));

    // second search without last word
    for (let manga of mangaedenListe) {
        if (googleMangaNameCleaned === manga.title_cleaned) {
            console.log('Found specific manga from MangaEden List ! ' + manga.id);
            return manga.id;
        }
    }

    return '-1';
};

let transformMangafromMangaEden = (mangaEdenApiBody) => {
    let chapters = [];

    // JSON example
    /* "chapters": [
            [
              32, // chapter number
              1516615653.0, // timestamp of released date
              "Dragon Ball Super 32:", // name
              "5a65b7e5719a1643241a5e1f" // id
            ],
            .
            .
            .
         ] */

    mangaEdenApiBody.chapters.forEach(function (chapter) {
        chapters.push({
            num: chapter[0],
            releasedDate: chapter[1],
            name: chapter[2],
            id: chapter[3],
        });
    });

    return {
        author: mangaEdenApiBody.author,
        categories: mangaEdenApiBody.categories, // Array of names
        description: mangaEdenApiBody.description,
        imageLink: mangaedenImagesBaseUrl + mangaEdenApiBody.image,
        isOnGoing: mangaEdenApiBody.status == 1, // 1 = still on going.
        chapters: chapters,
    }
};

let transformChapterfromMangaEden = (mangaEdenApiBody) => {
    let imgs = mangaEdenApiBody.images;
    let scans = [];

    for (let img of imgs) {
        scans.push({
            index: img[0],
            url: mangaedenImagesBaseUrl + img[1],
        });
    }

    return scans.reverse();
};

module.exports = MangaController;