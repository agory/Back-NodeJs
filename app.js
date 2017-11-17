let express = require('express');
let app = express();
let morgan = require('morgan');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let config = require('./config');

let port = process.env.PORT || 3000;

mongoose.connect(config.database, {
    useMongoClient: true
});
app.set('JWTSecret', config.secret);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

let users = require('./src/route/user');
let books = require('./src/route/book');
app.listen(port);

app.use('/users', users);
app.use('/books', books);
console.log('RESTful API server started on: ' + port);

module.exports = app;