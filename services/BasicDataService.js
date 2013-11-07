var log = require('../utils/logger.js');
var Assignable = require('../model/model.js')['Assignable'];
var TeamMember = require('../model/model.js')['TeamMember'];
var _ = require('underscore');

module.exports = {
    insertAssignable: function (postBody, callback) {


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

