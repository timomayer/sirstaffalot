/**
 * Logger utils
 *
 * Usage:
 * var log = require('./utils/logger.js');
 * log.log('info', "127.0.0.1 - there's no place like home");
 * log.log('warn', "127.0.0.1 - there's no place like home");
 * log.log('error', "127.0.0.1 - there's no place like home");
 * log.info("127.0.0.1 - there's no place like home");
 * log.warn("127.0.0.1 - there's no place like home");
 * log.error("127.0.0.1 - there's no place like home");
 */

var winston = require('winston');
if (GLOBAL.config) {
    var loglevel = GLOBAL.config.loglevel;
}
else {
    loglevel = 'debug';
}
var log = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ level: loglevel, json: false, timestamp: true, colorize: true }),
        //new winston.transports.File({ filename: __dirname + '/debug.log', json: false })
    ],
    exceptionHandlers: [
        new (winston.transports.Console)({ json: false, timestamp: true }),
        //new winston.transports.File({ filename: __dirname + '/exceptions.log', json: false })
    ],
    exitOnError: false
});

module.exports = log;
