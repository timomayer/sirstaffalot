var timeConverter = require('../utils/timeConverter.js');
var log = require('../utils/logger.js');
var Assignable = require('../model/model.js')['Assignable'];
var TeamMember = require('../model/model.js')['TeamMember'];
var _ = require('underscore');

module.exports = {
	insertAssignable: function (postBody, callback) {

		if (postBody.startDate) {
			postBody.startDate = timeConverter.convertFormToDBTime(postBody.startDate);
		}
		if (postBody.endDate) {
			postBody.endDate = timeConverter.convertFormToDBTime(postBody.endDate);
		}

		var newAssignable = Assignable.build(postBody).error(function (err) {
			log.error('Validation-Error');
			callback(err);
		});

		newAssignable.save()
			.success(function (result) {
				callback(null, result);
			})
			.error(function (err) {
				// Side-Info: ErrNo for bad validation is 1048
				callback(err);
			});

	},

	insertTeamMember: function (postBody, callback) {

		var newTeamMember = TeamMember.build(postBody);
		newTeamMember.save()
			.success(function (result) {
				callback(null, result);
			})
			.error(function (err) {
				callback(err);
			});
	}

};

