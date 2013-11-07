var models = require('../model/model.js');
var _ = require('underscore');
var teamMembersJson = require('./testdata/teamMembers.json');
var assignablesJson = require('./testdata/assignables.json');
var assignmentsJson = require('./testdata/assignments.json');
var log = require('../utils/logger.js');

var TeamMember = models['TeamMember'];
var Assignable = models['Assignable'];
var Assignment = models['Assignment'];


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

_.each(assignmentsJson, function(assignment) {
    Assignment
        .destroy(assignment)
        .success(function(destroyedAssignment) {
            log.info('Assignment destroyed: '+destroyedAssignment);
        });
});