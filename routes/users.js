var express = require('express');
var router = express.Router();

var Conn = require('../models/usersModel.js');

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
    Conn.connect();
    var username = req.body.username || '';
    var password = req.body.password || '';
    Conn.query("select password from users where username = '"+ username +"'", function (err, rs) {
        if (err) {
            console.log(err);
            res.render('error', {});
        }
        var dbPassword = rs[0].password;

        if (dbPassword === password) {
            res.send('登录成功');
        }
        else {
            res.send('用户名或密码错误！');
        }

    })

});

module.exports = router;
