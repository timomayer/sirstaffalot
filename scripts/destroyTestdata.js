var models = require('../model/model.js');
var _ = require('underscore');
var teamMembersJson = require('./testdata/teamMembers.json');
var assignablesJson = require('./testdata/assignables.json');
var log = require('../utils/logger.js');

var TeamMember = models['TeamMember'];
var Assignable = models['Assignable'];


_.each(teamMembersJson, function(teamMember) {
    TeamMember
        .destroy({"id":teamMember.id})
        .success(function(destroyedTeamMember) {
            log.info('TeamMember destroyed: '+destroyedTeamMember);
        });
});

_.each(assignablesJson, function(assignable) {
    Assignable
        .destroy({"id":assignable.id})
        .success(function(destroyedAssignable) {
            log.info('Assignable destroyed: '+destroyedAssignable);
        });
});