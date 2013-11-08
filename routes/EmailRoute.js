var EmailService = require('../services/EmailService.js');
var log = require('../utils/logger.js');



exports.triggerAssignmentMail = function (req, res, next) {
	EmailService.triggerMail();
}