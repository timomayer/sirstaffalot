/**
 * MAPS
 * @param resultSet
 * @returns {{}}
 */
function mapResultsetToProjectAssignment(resultSet) {
	var resultJSON = {};

	_.each(resultSet, function (currentRow) {

		var cwCoord = currentRow.year + '_' + currentRow.cw;

		if (!resultJSON[currentRow.assignableId]) {
			resultJSON[currentRow.assignableId] = {};
			resultJSON[currentRow.assignableId].assignableName = currentRow.assignableName;
			resultJSON[currentRow.assignableId].assignableType = currentRow.assignableType;
			resultJSON[currentRow.assignableId].startDate = currentRow.startDate;
			resultJSON[currentRow.assignableId].endDate = currentRow.endDate;

		}
		if (!resultJSON[currentRow.assignableId]['cws']) {
			resultJSON[currentRow.assignableId]['cws'] = {};
		}
		if (!resultJSON[currentRow.assignableId]['cws'][cwCoord]) {
			resultJSON[currentRow.assignableId]['cws'][cwCoord] = [];
		}
		resultJSON[currentRow.assignableId]['cws'][cwCoord].push({
			teamMemberId: currentRow.teamMemberId,
			teamMemberName: currentRow.teamMemberName,
			teamMemberType: currentRow.teamMemberType,
			days: currentRow.days});
	});
	return resultJSON;
}

/**
 * MAPS
 * @param resultSet
 * @returns {{}}
 */
function mapResultsetToTeamMemberAssignment(resultSet) {
	var resultJSON = {};

	_.each(resultSet, function (currentRow) {

		var cwCoord = currentRow.year + '_' + currentRow.cw;

		if (!resultJSON[currentRow.teamMemberId]) {
			resultJSON[currentRow.teamMemberId] = {};
			resultJSON[currentRow.teamMemberId].teamMemberName = currentRow.teamMemberName;
			resultJSON[currentRow.teamMemberId].teamMemberType = currentRow.teamMemberType;
		}
		if (!resultJSON[currentRow.teamMemberId]['cws']) {
			resultJSON[currentRow.teamMemberId]['cws'] = {};
		}
		if (!resultJSON[currentRow.teamMemberId]['cws'][cwCoord]) {
			resultJSON[currentRow.teamMemberId]['cws'][cwCoord] = [];
		}
		resultJSON[currentRow.teamMemberId]['cws'][cwCoord].push({
			assignableId: currentRow.assignableId,
			assignableName: currentRow.assignableName,
			assignableType: currentRow.assignableType,
			startDate: currentRow.startDate,
			endDate: currentRow.endDate,
			days: currentRow.days
		});
	});
	return resultJSON;
}
