var moment = require('moment');


var dbTimeFormat = 'YYYY-MM-DD HH:mm:ss';
var formTimeFormat = 'DD.MM.YYYY';
var germanDate = 'DD.MM.YYYY';

exports.convertFormToDBTime = function (dateString) {
	return moment(dateString, formTimeFormat).format(dbTimeFormat);
}

/**
 * Takes a CW-String of the form 'YYYY_CW' and returns object of form
 * {year: YYYY, cw: CW}
 * @param cwString
 * @returns {{year: YYYY, cw: CW}}
 */
exports.convertCWStringToTimeJSON = function (cwString) {
	var splitArray = cwString.split('_');
	if (splitArray.length !== 2
		|| splitArray[0].length !== 4
		|| splitArray[1].length < 1
		|| splitArray[1].length > 2) {
		throw new Error('Couldnt identify CWString...');
	}
	return {year: splitArray[0], cw: splitArray[1]};
}

/**
 * Puts the given yera and CW in a String of the form 'YEAR_CW'
 * @param year
 * @param cw
 * @returns {string}
 */
exports.convertYearAndCWToCWString = function (year, cw) {
	if (!year || typeof(year) !== 'string' || !cw || typeof(cw) !== 'string') {
		throw new Error('Missing or wrong parameter...');
	}
	return year + '_' + cw;
}

/**
 * Given a DB-Datetime String, this method returns a readable Date in German syntax
 * @param dbTime
 * @returns {*}
 */
exports.convertDBTimeToGermanDate = function(dbTime){
	return moment(dbTime, dbTimeFormat).format(germanDate);
}