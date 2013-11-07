// START BY IMPORTING CONFIG
var config = require('./config.json');
GLOBAL.config = config;

// ********* NATIVE NPM MODULES
var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// ********* PROJECT SPECIFIC MODULES
var models = require('./model/model.js');
var log = require('./utils/logger.js');
var routes = require('./routes');


// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', routes.index);


http.createServer(app).listen(app.get('port'), function(){
  log.info('Express server listening on port ' + app.get('port'));
});
