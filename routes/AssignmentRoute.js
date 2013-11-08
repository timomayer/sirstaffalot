var AssignmentService = require('../services/AssignmentService');
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
		return;
	}
	AssignmentService.list(fromCW, toCW, function (err, result) {
		if (err) {
			next(err);
		}
		else {
			res.json(result);
		}
	});
}


exports.saveAssignment = function (req, res, next) {
	try {
		// No Empty Bodies and all parameters need to be sent
		if (!req.body) {
			throw new Error('No Data recieved!');
		}
		if (!req.body.cw
			|| !req.body.assignableId
			|| !req.body.teamMemberId
			|| !req.body.days
			) {
			throw new Error('One or more Parameters were missing! Got ' +
				', cw = '+req.body.cw+
				', assignableId = '+req.body.assignableId+
				', teamMemberId = '+req.body.teamMemberId+
				', days = '+req.body.days);
		}

		// convert the CW-String to year and cw
		var yearCWObject = timeConverter.convertCWStringToTimeJSON(req.body.cw);

		var assignmentData = {
			cw: yearCWObject.cw,
			year: yearCWObject.year,
			AssignableId: req.body.assignableId,
			TeamMemberId: req.body.teamMemberId
		};

		var daysToAllocate = req.body.days;

		// Send the ready postBody to the save-function
		AssignmentService.insertOrUdateAssignment(assignmentData, daysToAllocate, function (err, result) {
			if (err) {
				next(err);
			}
			else {
				res.send(200, 'Assignment was saved.');
			}
		})

	}
	catch (err) {
		next(err);
	}
}