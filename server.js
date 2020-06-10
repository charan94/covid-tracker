const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
var path = require('path');
var http = require('http');

const app = express();
// required for parsing body from requests
app.use(bodyParser.json({ limit: '1024mb' }));
app.use(bodyParser.urlencoded({
    extended: false,
    limit: '1024mb'
}));
// app.use(helmet()); // required for sanitizing headers
app.use(morgan('dev')); // required for mapping requests to console

app.use('/', express.static(path.join(__dirname, 'build')));

var landingController = require('./api/controllers/landing.controller');

app.use('/', landingController);

app.use((req, res, next) => {
    var error = new Error('Unavailable');
    error.status = 500;
    next(error);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send({
        status: err.status || 500,
        error: err.message || 'No data found'
    });
});

const port = process.env.PORT || 4200;


var httpServer = http.createServer(app);

httpServer.listen(port, () => {
    console.log('server started ', httpServer.address());
    console.info(`Express listening on port ${port}`);
});

httpServer.setTimeout(999999);
