let express = require('express');
let app = express();
let port = process.env.PORT || 3000;
let users = require('./src/route/user');
let books = require('./src/route/book');
app.listen(port);

app.use('/users', users);
app.use('/books', books);
console.log('RESTful API server started on: ' + port);