var _ = require('underscore');
var log = require('../utils/logger.js');
var models = require('../model/model.js');
var sequelize = require('../model/model.js').sequelize;
var sprintf = require('sprintf').sprintf;

var assignmentsSQL = "select assignable.name assignableName, assignable.id assignableId, assignment.cw, teammember.id teamMemberId, assignment.days, teammember.name teamMemberName, assignable.days assignableDays from assignment " +
	"inner join assignable on assignable.id = assignment.AssignableId " +
	"inner join teammember on teammember.id = assignment.TeamMemberId" +
	" where " +
	"   assignment.year >= %s and assignment.cw >= %s" +
	"   and " +
	"   assignment.year <= %s and assignment.cw <= %s" +
	"   order by assignable.name, assignable.id, assignment.cw, teammember.name, teammember.id;";

module.exports = {
	getAssignmentsForTeamMembers: function (fromCW, toCW, callback) {

	},

	getAssignemntsForAssignables: function (fromCW, toCW, callback) {

		var sql = sprintf(assignmentsSQL, fromCW.year, fromCW.cw, toCW.year, toCW.cw);
		log.info(sql);
		sequelize.query(sql, null, {raw: true}).success(function (resultSet) {
			// trans
			console.log(resultSet);
		}).error(function (err) {
				console.log(err);
			});
	}

};

