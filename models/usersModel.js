/**
 * @author baidu on 15/10/2.
 * @file
 */
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'schoeu.com',
    user: 'root',
    password: '1234',
    database: 'vs'
});
module.exports = conn;
