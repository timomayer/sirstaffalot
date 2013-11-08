var AsignmentService = require('../services/AssignmentService');
var timeConverter = require('../utils/timeConverter.js');
var log = require('../utils/logger.js');

exports.listAssignments = function (req, res, next) {
	try {
		if (!req.query || !req.query.fromCW || !req.query.toCW) {
			throw new Error('Missing Parameters...');
		}
		var fromCW = timeConverter.convertCWStringToTimeJSON(req.query.fromCW);
		var toCW = timeConverter.convertCWStringToTimeJSON(req.query.toCW);
	}
	catch (err) {
		next(err);
	}
	AsignmentService.list(fromCW, toCW, function (err, result) {
		if (err) {
			next(err);
		}
		else {
			res.json(result);
		}
	});
}