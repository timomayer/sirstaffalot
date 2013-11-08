/**
 * MAPS
 * @param resultSet
 * @returns {{}}
 */
function mapResultsetToProjectAssignment(resultSet) {
	var resultJSON = {};

	_.each(resultSet, function (currentRow) {
		var project_name = currentRow[0];
		var project_id = currentRow[1];

		var cw = currentRow[2];
		var userId = currentRow[3];
		var days = currentRow[4];
		var userName = currentRow[5];
		var project_days = currentRow[6];

		if (!resultJSON[currentRow.assignableId]) {
			resultJSON[project_id] = {};
			resultJSON[project_id].name = project_name;
			resultJSON[project_id].project_days = project_days;
		}
		if (!resultJSON[project_id][cw]) {
			resultJSON[project_id][cw] = {};
		}
		if (!resultJSON[project_id][cw][userId]) {
			resultJSON[project_id][cw][userId] =
			{
				days: days,
				name: userName
			}
		}

	});
	return resultJSON;
}


function mapResultsetToProjectAssignment(resultSet) {
	var resultJSON = {};

	_.each(resultSet, function (currentRow) {
		var project_name = currentRow[0];
		var project_id = currentRow[1];

		var cw = currentRow[2];
		var userId = currentRow[3];
		var days = currentRow[4];
		var userName = currentRow[5];
		var project_days = currentRow[6];

		if (!resultJSON[currentRow.assignableId]) {
			resultJSON[project_id] = {};
			resultJSON[project_id].name = project_name;
			resultJSON[project_id].project_days = project_days;
		}
		if (!resultJSON[project_id][cw]) {
			resultJSON[project_id][cw] = {};
		}
		if (!resultJSON[project_id][cw][userId]) {
			resultJSON[project_id][cw][userId] =
			{
				days: days,
				name: userName
			}
		}

	});
	return resultJSON;
}