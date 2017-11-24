let unirest = require('unirest');

let googleUrl = '//https://www.googleapis.com/books/v1/volumes?q=';

let apiCall = {
    getMangaByIsbn: function (req, res, next) {
        let isbn = req.params.isbn;
        unirest.get(googleUrl + isbn)
            .send()
            .end(response => {
                if (response.ok) {
                    console.log("Got a response: ", response.body);
                    res.status(200);
                    res.json(response.body);
                } else {
                    console.log("Got an error: ", response.error);
                    res.status(404);
                    res.json({error: 'no manga with such isbn'})
                }
                return response;
            });
    },
};

module.exports = apiCall;