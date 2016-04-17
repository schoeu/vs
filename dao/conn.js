/**
 * Created by baidu on 16/1/31.
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'xx.xx.xx.xx',
    user: 'root',
    password: 'xx',
    database: 'vs'
});

module.exports = pool;