var express = require('express');
var router = express.Router();

var query = require('../models/index.js').query;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// schoeu主页
router.get('/schoeu', function (req, res) {
    res.render('schoeu');
});

// wiki
router.get('/viki', function (req, res) {
    res.render('viki');
});

// 登录
router.get('/login', function (req, res) {
    res.render('login');
});

// 登录
router.post('/login', function (req, res) {
    var username = req.body.username || '';
    var password = req.body.password || '';

    query("select password from users where username = '"+ username +"'", function (err, rs, fileds) {
        if (err) {
            console.log(err);
            res.send('error');
        }
        else {
            console.log(rs);
            var dbPassword = rs[0] && rs[0].password;

            // 如果密码正确
            if (dbPassword === password) {
                res.redirect('/articles/submit');
            }
            // 密码错误
            else {
                res.send('用户名或密码错误！');
            }
        }
    });
});

module.exports = router;
