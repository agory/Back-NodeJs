let unirest = require('unirest');

let googleUrl = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';

let apiCall = {
    getMangaByIsbn: function (isbn, callback) {
        unirest.get(googleUrl + isbn)
            .send()
            .end(response => {
                if (response.ok && response.body.totalItems) {
                    console.log("Got a response: ", response.body);
                    callback(null, response.body);
                } else {
                    console.log("Got an error: ", response.error);
                    callback("No manga with such isbn : " + isbn + ". " + response.error);
                }
            });
    },
};

module.exports = apiCall;