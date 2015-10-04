/**
 * @author baidu on 15/10/2.
 * @file
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    //host: '168.235.84.57',
    user: 'root',
    password: '1234',
    database: 'vs'
});
module.exports = pool;

