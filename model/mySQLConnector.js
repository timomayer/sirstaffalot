/**
 * Created with IntelliJ IDEA.
 * User: David
 * Date: 07.11.13
 * Time: 11:50
 * To change this template use File | Settings | File Templates.
 */
                             var log = require('../utils/logger.js');
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '192.168.80.232',
    user     : 'sirstaffalot',
    password : 'fat$sirstaff'
});

connection.connect(function(err){
    if(err){
        log.info('Test-Timeout');
    }
    else {
        console.log('MySQL Connected!');
    }
});

exports.connection;