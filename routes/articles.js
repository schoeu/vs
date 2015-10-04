/**
 * @author baidu on 15/10/3.
 * @file
 */
var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var path = require('path');

var query = require('../models/index.js').query;

router.get('/submit', function (req, res, next) {
    res.render('infoSubmit',{
        isLogined: true
    });
});

router.post('/submit', function (req, res, next) {
    // parse a file upload
    var form = new multiparty.Form({
        uploadDir: path.join(__dirname, '../uploads/')
    });
    form.parse(req, function(err, fields, files) {
        if (err) {
            req.send('err');
            return false;
        }
        console.log(files);
        var uploadImg = files.uploadImg || [];
        var flashArr = files.flashes || [];
        var videosArr = files.videos || [];
        var zipsArr = files.zips || [];

        var uploadImgStr = getMultStr(uploadImg);
        var videoStr = getMultStr(videosArr);
        var flashStr = getMultStr(flashArr);
        var zipsStr = getMultStr(zipsArr);

        var insertSql = "insert into articles (artiName, artiPf, artiPs, artiDes, artiPics, selfColor, fontColor, artiTools, part, zipurl, flashurl, videourl, createdate, islock, artiaccredit) values ('"+
            fields.artName + "','" + fields.artPartf + "','" + fields.artParts + "','" + fields.artDes + "','" +  uploadImgStr + "','" +
            fields.selfCor + "','" + fields.fontColor + "','" + fields.artiToos + "','" + fields.part + "','" +
            zipsStr + "','" + flashStr + "','" + videoStr + "','" +
            fields.createdate + "','" +fields.islock + "','" + fields.artiaccredit + "')";
        query(insertSql, function (err, rs, filed) {
            if (err) {
                console.log(err);
                res.send('error');
            }
            console.log(rs);

        })
    });
});

function getMultStr(cttArr) {
    var rsArr = [];
    cttArr.forEach(function (obj, i) {
        if (obj.size) {
            rsArr.push(obj.path);
        }
    });
    return rsArr.join(',');
}


module.exports = router;