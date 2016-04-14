/**
 * Created by baidu on 16/1/17.
 */
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: '45.32.250.247',
    user: 'root',
    password: 'caoyifeng2b',
    database: 'vs'
});

module.exports = conn;