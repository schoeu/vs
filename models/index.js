/**
 * @author baidu on 15/10/2.
 * @file
 */
var pool = require('./mysqlpool.js');
var query = function (sql, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        }
        else {
            conn.query(sql, function (rs, vals, fields) {
                // 释放连接
                conn.release();
                // 时间驱动回调
                callback(rs, vals, fields);
            });
        }
    });
};
module.exports.query = query;