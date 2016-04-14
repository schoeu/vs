var express = require('express');
var router = express.Router();
var pool = require('../dao/conn.js');
var formidable = require('formidable');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/articles', function (req, res, next) {
    var name = req.session.username;
    if (name){
        res.render('addArticle', {username: name});
    }
    else {
        res.redirect('/');
    }
});

router.post('/articles', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(error, fields, files){
        // fields 各form字段map
        // files 上传文件图片
        if (error) {
            throw  error;
        }
        console.log(fields);
        console.log(files);

        var artSql = "insert into articles (title,classify_first,description,classify_second,images,date,isSafe,authorization) values ('{title}','{classify_first}','{description}','{classify_second}','{images}','{date}','{isSafe}','{authorization}')";
        artSql = artSql.replace('{title}', fields.title || '')
            .replace('{classify_first}', fields.classify_first || '')
            .replace('{description}', fields.description || '')
            .replace('{classify_second}', fields.classify_second || '')
            .replace('{images}', files.images || '')
            .replace('{isSafe}', fields.isSafe || '')
            .replace('{authorization}', fields.authorization || '')
            .replace('{date}', fields.date || '');

        console.log(artSql);

        res.end('OK');
    });
});

router.get('/aboutme', function (req, res, next) {
    pool.getConnection(function (err, conn) {
        if (err) {
            throw err;
        }
        var username = req.session.username;
        if (username) {
            var queryStr = "select * from users where username='" + username + "'";
            conn.query(queryStr, function (err, rs) {
                if (err) {
                    throw err;
                }
                res.render('aboutMe', {local: rs[0]});
            });
        }
        else {
            res.redirect('/');
        }

    });

});


router.get('/pinfo', function (req, res, next) {
    res.render('editPersonInfo');
});


router.post('/pinfo', function (req, res, next) {
    var name = req.session.username;
    if (name) {
        pool.getConnection(function (err, conn) {
            if (err) {
                throw err;
            }
            var updateSql = "update users set nickname='{nickname}',qq='{qq}',email='{email}',skills='{skills}',years='{years}',description='{description}' where username='"+ name +"'";
            var rsSql = updateSql
                .replace('{nickname}', req.body.nickname)
                .replace('{qq}', req.body.qq)
                .replace('{email}', req.body.email)
                .replace('{userhob}', req.body.userhob)
                .replace('{skills}', req.body.skills)
                .replace('{years}', req.body.years)
                .replace('{description}', req.body.description);

            conn.query(rsSql, function (err, rs) {
                if (err) {
                    throw err;
                }
                conn.release();
                res.redirect('/');
            });

        });
    }
    else {
        res.redirect('/');
    }
});

module.exports = router;
