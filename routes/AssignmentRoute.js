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
		return;
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


exports.insertAssignment = function (req, res, next) {
	try {
		// No Empty Bodies and all parameters need to be sent
		if (!req.body) {
			throw new Error('No Data recieved!');
			return;
		}
		if (!req.body.cw
			|| !req.body.assiganbleId
			|| !req.body.teamMemberId
			|| !req.body.days
			) {
			throw new Error('One or more Parameters were missing!');
		}

		// convert the CW-String to year and cw
		var yearCWObject = timeConverter.convertCWStringToTimeJSON(req.body.cw);
		req.body.cw = yearCWObject.cw;
		req.body.year = yearCWObject.year;

		// Send the ready postBody to the save-function
		AsignmentService.insertAssignment(req.body, function (err, result) {
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