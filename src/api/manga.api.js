const unirest = require('unirest');
const NodeCache = require('node-cache');
const TTL = 60*60*24*10; // 10 jours
const cache = new NodeCache({ stdTTL: TTL, checkperiod: TTL + 20 });

const googleUrl = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
const mangaedenBaseUrl = 'https://www.mangaeden.com/api/';
const mangaedenImagesBaseUrl = 'http://cdn.mangaeden.com/mangasimg/';

let apiCall = {
    getMangaByIsbn: function (isbn) {
        return new Promise(function (resolve, reject) {
            const book = cache.get( "book-isbn-" + isbn);
            if(book) {
                return resolve(book)
            }

            unirest.get(googleUrl + isbn)
                .send()
                .end(response => {
                    if (response.ok && response.body.totalItems) {
                        console.log("Got a response: ", response.body);
                        cache.set( "book-isbn-" + isbn,response.body);
                        resolve(response.body);
                    } else {
                        console.log("Got an error: ", response.error);
                        reject("No manga with such isbn : " + isbn + ". " + response.error);
                    }
                });
        });
    },
    getAllMangaedenManga: function () {
        return new Promise(function (resolve, reject) {
            const list = cache.get( "mangaeden-all-manga-list");
            if(list) {
                return resolve(list)
            }

            unirest.get(mangaedenBaseUrl + 'list/0/')
                .send()
                .end(response => {
                    if (response.ok) {
                      //DEBUG :  console.log("Got a response: ", response.body);
                        cache.set( "mangaeden-all-manga-list",response.body);
                        resolve(response.body);
                    } else {
                        console.log("Got an error: ", response.error);
                        reject("No such manga list. " + response.error);
                    }
                });
        });
    },
    getMangaByIdMangaeden: function (id) {
        return new Promise(function (resolve, reject) {
            const book = cache.get( "book-id-" + id);
            if(book) {
                return resolve(book)
            }

            unirest.get(mangaedenBaseUrl + 'manga/' + id)
                .send()
                .end(response => {
                    if (response.ok) {
                        console.log("Got a response: ", response.body);
                        cache.set( "book-id-" + id,response.body);
                        resolve(response.body);
                    } else {
                        console.log("Got an error: ", response.error);
                        reject("No manga with such id : " + id + ". " + response.error);
                    }
                });
        });
    },
    getScansByChapterMangaeden: function (chapterId) {
        return new Promise(function (resolve, reject) {
            const chapter = cache.get( "chapter-id-" + chapterId);
            if(chapter) {
                return resolve(chapter)
            }

            unirest.get(mangaedenBaseUrl + 'chapter/' + chapterId)
                .send()
                .end(response => {
                    console.log('in');
                    if (response.ok) {
                        console.log("Got a response: ", response.body);
                        cache.set( "chapter-id-" + chapterId,response.body);
                        resolve(response.body);
                    } else {
                        console.log("Got an error: ", response.error);
                        reject("No chapter with such id : " + chapterId + ". " + response.error);
                    }
                });
        });
    }
};

module.exports = apiCall;