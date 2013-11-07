var timeConverter = require('../utils/timeConverter.js');
var log = require('../utils/logger.js');
var Assignable = require('../model/model.js')['Assignable'];
var TeamMember = require('../model/model.js')['TeamMember'];
var _ = require('underscore');

module.exports = {
    insertAssignable: function (postBody, callback) {
        log.info('Trying to safe: ' + postBody);

        if (postBody.startDate) {
            postBody.startDate = timeConverter.convertFormToDBTime(postBody.startDate);
        }
        if (postBody.endDate) {
            postBody.endDate = timeConverter.convertFormToDBTime(postBody.endDate);
        }


        var newAssignable = Assignable.build(postBody);
        newAssignable.save()
            .success(function (result) {
                callback(null, result);
            })
            .error(function (err) {
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

