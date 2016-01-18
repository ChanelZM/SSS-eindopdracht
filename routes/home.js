var express = require('express');
var fs = require('fs');

var router = express.Router();

router.get('/', function (req, res, next) {
    fs.readdir('public/upload', function (err, files) {
        if (err) throw err;
        res.locals.photo = files;
        res.render('upload/upload', {
            title: 'Uploads'
        });
    });
});

module.exports = router; //Geef deze router terug aan app.js
