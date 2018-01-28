let express = require('express');
let app = express();
let morgan = require('morgan');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

/**
 * Select config
 */
let config;
const env = app.get('env').trim();
console.log("Mode : " + env);
if (env === "production"){
    config = require('./config.prod');
} else {
    config = require('./config.dev');
}

let port = process.env.PORT || 3000;
mongoose.Promise = Promise;
mongoose.connect(config.database, {
    useMongoClient: true
})
    .then(() => console.log('connection to database successful'))
    .catch((err) => console.error(err));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let route = require('./src/route/route');
app.listen(port);
console.log('RESTful API server started on: ' + port);

app.use('/', route);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.json(req.app.get('env') === 'development' ? err : err.message);
});

module.exports = app;