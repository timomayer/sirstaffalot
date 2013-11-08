var EmailService = require('../services/EmailService.js');
var log = require('../utils/logger.js');



exports.triggerAssignmentMail = function (req, res, next) {
	EmailService.triggerAssignmentMail(function(err){
		if(err){
			next(err);
		}
		else {
			res.send(200, 'Email send succesfully');
		}
	});
}