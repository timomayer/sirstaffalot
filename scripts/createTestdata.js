var models = require('../model/model.js');
var _ = require('underscore');
var teamMembersJson = require('./testdata/teamMembers.json');
var assignablesJson = require('./testdata/assignables.json');
var log = require('../utils/logger.js');

var TeamMember = models['TeamMember'];
var Assignable = models['Assignable'];

log.info('Adding testdata')
log.info('TeamMembers: '+teamMembersJson);

_.each(teamMembersJson, function(teamMember) {
   TeamMember
       .destroy({"id":teamMember.id})
       .success(function(destroyedTeamMember) {
            log.info('TeamMember destroyed: '+destroyedTeamMember);
       });
});

TeamMember
    .bulkCreate(teamMembersJson)
    .success(function() {
        TeamMember.findAll().success(function(teamMember) {
            log.info(teamMember.name);
        })
    }).error(function(error) {
        log.error(error);
    });

log.info('Assignable: '+assignablesJson);
Assignable
    .bulkCreate(assignablesJson)
    .success(function() {
        Assignable.findAll().success(function(assignable) {
            log.info(assignable.name);
        })
    }).error(function(error) {
        log.error(error);
    });
