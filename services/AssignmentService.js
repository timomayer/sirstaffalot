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

//		var sql = sprintf(assignmentsSQL, fromCW.year, fromCW.cw, toCW.year, toCW.cw);
//
//		sequelize.query(sql, null, {raw: true}).success(function (resultSet) {
//			callback(null, resultSet);
//		}).error(function (err) {
//				callback(err);
//			});
		callback(null, mock);

	},

	insertOrUdateAssignment: function (assignmentData, daysToAllocate, callback) {

		// f**** hell: Sequelize can not update entities with composed primary keys.
		// so we do a delete and insert instead. Pain in the ass!
		Assignment.destroy(assignmentData).success(function() {
			assignmentData.days = daysToAllocate;
			Assignment.create(assignmentData)
				.success(function(result) {
					callback(null, result);
				}).error(function(err) {
					callback(err);
				});
		});


		/*console.log(assignmentData);
		Assignment.findOrCreate(assignmentData)
			.success(function(assignment, created) {
				console.log(assignment.cw);
				console.log(assignment.year);
				console.log(assignment.AssignableId);
				console.log(assignment.TeamMemberId);

				assignment.days = daysToAllocate;
				assignment.save()
					.success(function() {
						console.log("sucess");
						callback(null, result);
					}).error(function(err) {
						console.log("Error: "+err);
						callback(err);
					});
			});
		*/

	}

};

var mock = [
	{
		"assignableName": "Crazy App",
		"assignableType": "project",
		"startDate": "2013-11-09T00:00:00.000Z",
		"endDate": "2013-12-01T00:00:00.000Z",
		"assignableId": 2,
		"cw": 44,
		"teamMemberId": 1,
		"teamMemberType": "internal",
		"days": 4.5,
		"year": 2013,
		"teamMemberName": "David",
		"assignableDays": 10.5
	},
	{
		"assignableName": "Crazy App",
		"assignableType": "project",
		"startDate": "2013-11-09T00:00:00.000Z",
		"endDate": "2013-12-01T00:00:00.000Z",
		"assignableId": 2,
		"cw": 45,
		"teamMemberId": 1,
		"teamMemberType": "internal",
		"days": 2,
		"year": 2013,
		"teamMemberName": "David",
		"assignableDays": 10.5
	},
	{
		"assignableName": "Crazy App",
		"assignableType": "project",
		"startDate": "2013-11-09T00:00:00.000Z",
		"endDate": "2013-12-01T00:00:00.000Z",
		"assignableId": 2,
		"cw": 45,
		"teamMemberId": 2,
		"teamMemberType": "internal",
		"days": 2,
		"year": 2013,
		"teamMemberName": "Markus",
		"assignableDays": 10.5
	},
	{
		"assignableName": "Crazy App",
		"assignableType": "project",
		"startDate": "2013-11-09T00:00:00.000Z",
		"endDate": "2013-12-01T00:00:00.000Z",
		"assignableId": 2,
		"cw": 45,
		"teamMemberId": 3,
		"teamMemberType": "internal",
		"days": 1,
		"year": 2013,
		"teamMemberName": "Timo",
		"assignableDays": 10.5
	},
	{
		"assignableName": "Crazy App",
		"assignableType": "project",
		"startDate": "2013-11-09T00:00:00.000Z",
		"endDate": "2013-12-01T00:00:00.000Z",
		"assignableId": 2,
		"cw": 46,
		"teamMemberId": 1,
		"teamMemberType": "internal",
		"days": 2,
		"year": 2013,
		"teamMemberName": "David",
		"assignableDays": 10.5
	},
	{
		"assignableName": "Crazy App",
		"assignableType": "project",
		"startDate": "2013-11-09T00:00:00.000Z",
		"endDate": "2013-12-01T00:00:00.000Z",
		"assignableId": 2,
		"cw": 46,
		"teamMemberId": 2,
		"teamMemberType": "internal",
		"days": 1.75,
		"year": 2013,
		"teamMemberName": "Markus",
		"assignableDays": 10.5
	},
	{
		"assignableName": "Fancy SUV",
		"assignableType": "project",
		"startDate": "2013-09-09T00:00:00.000Z",
		"endDate": "2013-10-09T00:00:00.000Z",
		"assignableId": 1,
		"cw": 37,
		"teamMemberId": 1,
		"teamMemberType": "internal",
		"days": 3.25,
		"year": 2013,
		"teamMemberName": "David",
		"assignableDays": 5
	},
	{
		"assignableName": "Fancy SUV",
		"assignableType": "project",
		"startDate": "2013-09-09T00:00:00.000Z",
		"endDate": "2013-10-09T00:00:00.000Z",
		"assignableId": 1,
		"cw": 38,
		"teamMemberId": 2,
		"teamMemberType": "internal",
		"days": 5,
		"year": 2013,
		"teamMemberName": "Markus",
		"assignableDays": 5
	},
	{
		"assignableName": "Fancy SUV",
		"assignableType": "project",
		"startDate": "2013-09-09T00:00:00.000Z",
		"endDate": "2013-10-09T00:00:00.000Z",
		"assignableId": 1,
		"cw": 44,
		"teamMemberId": 3,
		"teamMemberType": "internal",
		"days": 3,
		"year": 2013,
		"teamMemberName": "Timo",
		"assignableDays": 5
	},
	{
		"assignableName": "sick",
		"assignableType": "project",
		"startDate": null,
		"endDate": null,
		"assignableId": 9,
		"cw": 38,
		"teamMemberId": 2,
		"teamMemberType": "internal",
		"days": 2,
		"year": 2013,
		"teamMemberName": "Markus",
		"assignableDays": null
	},
	{
		"assignableName": "vacation",
		"assignableType": "project",
		"startDate": null,
		"endDate": null,
		"assignableId": 7,
		"cw": 46,
		"teamMemberId": 1,
		"teamMemberType": "internal",
		"days": 3,
		"year": 2013,
		"teamMemberName": "David",
		"assignableDays": null
	}
]



