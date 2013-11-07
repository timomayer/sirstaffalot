// START BY IMPORTING CONFIG
var config = require('./config.json')['development'];
GLOBAL.config = config;

// ********* NATIVE NPM MODULES
var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// ********* PROJECT SPECIFIC MODULES
var models = require('./model/model.js');

var log = require('./utils/logger.js');
var basicData = require('./routes/basicdata');


// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.set('models', models);

app.post('/insert/assignable', basicData.insertAssignable);
app.post('/insert/teamMember', basicData.insertTeamMember);

app.use(logErrors);
app.use(clientErrorHandler);


function logErrors(err, req, res, next) {
    log.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    //@todo dont send stack trace in production
    res.send(500, { error: err.stack });
}


http.createServer(app).listen(app.get('port'), function () {
    log.info('Express server listening on port ' + app.get('port'));
});
