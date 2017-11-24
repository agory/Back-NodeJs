let unirest = require('unirest');

let googleUrl = 'https://www.googleapis.com/books/v1/volumes?q=';

let apiCall = {
    getMangaByIsbn: function (isbn, callback) {
        unirest.get(googleUrl + isbn)
            .send()
            .end(response => {
                if (response.ok) {
                    console.log("Got a response: ", response.body);
                    //res.status(200);
                    callback(null, response.body);
                } else {
                    console.log("Got an error: ", response.error);
                    //res.status(404);
                    callback(response.error);
                }
            });
    },
};

module.exports = apiCall;