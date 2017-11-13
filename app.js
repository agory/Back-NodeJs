let express = require('express');
let app = express();
let port = process.env.PORT || 3000;
let users = require('./src/route/user');
app.listen(port);

app.use('/users', users);
console.log('RESTful API server started on: ' + port);