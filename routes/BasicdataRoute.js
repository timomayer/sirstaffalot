var BasicDataService = require('../services/BasicDataService.js');
var log = require('../utils/logger.js');

exports.insertAssignable = function (req, res, next) {
	if (!req.body) {
		next(new Error('Empty Post-Request!'));
		return;
	}

	var postData = req.body;
	BasicDataService.insertAssignable(postData, function (err, result) {
		if (err) {
			next(err);
		}
		else {
			res.send(200, 'Assignable was saved succesfully');
		}
	});
}


exports.insertTeamMember = function (req, res, next) {
	BasicDataService.insertTeamMember();
}