var moment = require('moment');

var dbTimeFormat = '';
var formTimeFormat = 'dd.mm.yyyy';

exports.convertFormToDBTime = function (dateString) {
    return moment(dateString, formTimeFormat).format(dbTimeFormat)
}

