const unirest = require('unirest');
const NodeCache = require('node-cache');
const TTL = 60*60*24*10; // 10 jours
const cache = new NodeCache({ stdTTL: TTL, checkperiod: TTL + 20 });
const googleUrl = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';

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
};

module.exports = apiCall;