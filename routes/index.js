var express = require('express');
var router = express.Router();
var pool = require('../dao/conn.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    var name = req.session.username;
    console.log(req.session.username);
    if (name) {
        res.render('main', {username: name});
    }
    else {
        res.render('main', {username: ''});
    }
});

router.post('/login', function (req, res, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            throw err;
        }
        conn.query('select * from users', function (err, row) {
            if (err) {
                throw err;
            }
            for (var i = 0, l = row.length; i < l; i++) {
                var crtUser = row[i];
                if (crtUser.username === req.body.username) {
                    if (crtUser.password === req.body.password) {
                        req.session.username = req.body.username;
                        res.json({status: 0, data: {logined: true, username: req.body.username}});
                    } else {
                        res.json({status: 0, data: {logined: false, username: req.body.username}});
                    }
                    break;
                }
            }
            conn.release();
        });
    });
});

module.exports = router;
