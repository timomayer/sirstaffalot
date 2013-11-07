/**
 * User: David
 * Date: 07.11.13
 * Time: 11:56
 * To change this template use File | Settings | File Templates.
 */



var winston = require('winston');


var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: 'debug',
            colorize: true,
            timestamp: true
        })
//        new (winston.transports.File)({ filename: 'somefile.log' })
    ]
});


module.exports = logger;