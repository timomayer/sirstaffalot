// START BY IMPORTING CONFIG
var config = require('./config.json')['development'];
GLOBAL.config = config;

// ********* NATIVE NPM MODULES
var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// ********* PROJECT SPECIFIC MODULES
//var models = require('./model/model.js');

var log = require('./utils/logger.js');
var basicDataRoute = require('./routes/BasicdataRoute');
var assignmentRoute = require('./routes/AssignmentRoute');


// ******* EXPRESS MODULES
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// ****** ASSIGNMENT FUNCTION
app.get('/list/assignments', assignmentRoute.listAssignments);

// ****** INSERT FUNCTIONS
app.post('/insert/assignable', basicDataRoute.insertAssignable);
app.post('/insert/teamMember', basicDataRoute.insertTeamMember);


// ******* ERROR HANDLING
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
