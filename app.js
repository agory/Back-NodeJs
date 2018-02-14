const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('./src/middleware/passport');

/**
 * Select config
 */
let config;
const env = app.get('env').trim();
console.log("Mode : " + env);
if (env === "production") {
    config = require('./config.prod');
} else {
    config = require('./config.dev');
}

const port = process.env.PORT || 3000;
mongoose.Promise = Promise;
mongoose.connect(config.database, {
    useMongoClient: true
})
    .then(() => console.log('connection to database successful'))
    .catch((err) => console.error(err));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
passport();
app.use(morgan('dev'));

const corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));


const route = require('./src/route/route');
app.listen(port);
console.log('RESTful API server started on: ' + port);

app.use('/', route);


// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        success: false,
        error: app.get('env') === 'production' ? err.message : {
            message: err.message,
            status: err.status,
            stack: err.stack.split('\n'),
            code: err.code,
        }
    });
});

module.exports = app;