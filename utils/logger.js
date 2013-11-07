/**
 * User: David
 * Date: 07.11.13
 * Time: 11:56
 * To change this template use File | Settings | File Templates.
 */



var winston = require('winston');


exports.logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
    ]
});