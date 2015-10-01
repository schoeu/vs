var express = require('express');
var router = express.Router();

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
    res.send('已登录');
});

module.exports = router;
