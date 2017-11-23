var unirest = require('unirest');

let url = '//https://www.googleapis.com/books/v1/volumes?q=';

let apiCall = {

    getMangaByIsbn: function (req, res, next) {
        unirest.get(url)
            .send()
            .end(response => {
                if (response.ok) {
                    console.log("Got a response: ", response.body)
                } else {
                    console.log("Got an error: ", response.error)
                }
            });
    },
}
module.exports = apiCall;