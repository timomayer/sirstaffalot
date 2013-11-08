var AsignmentService = require('../services/AssignmentService');
var timeConverter = require('../utils/timeConverter.js');
var log = require('../utils/logger.js');

exports.teamMemberrAssignments = function (req, res, next) {
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
	AsignmentService.getAssignmentsForTeamMembers(fromCW, toCW, function (err, result) {
		if (err) {
			next(err);
		}
		else {
			res.json(result);
		}
	});
}

exports.assignableAssignments = function (req, res, next) {
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

	AsignmentService.getAssignemntsForAssignables(fromCW, toCW, function (err, result) {
		if (err) {
			next(err);
		}
		else {
			res.json(result);
		}
	});
}