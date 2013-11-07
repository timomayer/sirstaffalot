var moment = require('moment');


var dbTimeFormat = 'YYYY-MM-DD HH:mm:ss';
var formTimeFormat = 'DD.MM.YYYY';

exports.convertFormToDBTime = function (dateString) {
    return moment(dateString, formTimeFormat).format(dbTimeFormat);
}

