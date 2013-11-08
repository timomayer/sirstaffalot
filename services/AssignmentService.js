var _ = require('underscore');
var log = require('../utils/logger.js');
var sequelize = require('../model/model.js').sequelize;
var Assignment = require('../model/model.js')['Assignment'];
var sprintf = require('sprintf').sprintf;

var assignmentsSQL = "select assignable.name assignableName, assignable.type assignableType, assignable.startDate, assignable.endDate, assignable.id assignableId, assignment.cw, teammember.id teamMemberId, teammember.type teamMemberType, assignment.days, assignment.year, teammember.name teamMemberName, assignable.days assignableDays from assignment " +
	"inner join assignable on assignable.id = assignment.AssignableId " +
	"inner join teammember on teammember.id = assignment.TeamMemberId" +
	" where " +
	"   assignment.year >= %s and assignment.cw >= %s" +
	"   and " +
	"   assignment.year <= %s and assignment.cw <= %s" +
	"   order by assignable.name, assignable.id, assignment.cw, teammember.name, teammember.id;";

module.exports = {

	list: function (fromCW, toCW, callback) {

		var sql = sprintf(assignmentsSQL, fromCW.year, fromCW.cw, toCW.year, toCW.cw);
		log.info(sql);
		sequelize.query(sql, null, {raw: true}).success(function (resultSet) {
			callback(null, resultSet);
		}).error(function (err) {
				callback(err);
			});
	},
	insertAssignment: function (postBody, callback) {

		var newAssignment = Assignment.build(postBody);
		newAssignment.save()
			.success(function (result) {
				callback(null, result);
			})
			.error(function (err) {
				callback(err);
			});


	}

};



