/**
 * Created by baidu on 16/1/31.
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    host: '45.32.12.23',
    user: 'root',
    password: 'sdf',
    database: 'vs'
});

module.exports = pool;