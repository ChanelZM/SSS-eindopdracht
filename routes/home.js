var express = require('express');
var fs = require('fs');

var router = express.Router();

router.get('/', function (req, res, next) {
    fs.readdir('public/upload', function (err, files) {
        res.locals.photo = files;
        res.render('uploads/upload', {
            title: 'Uploads'
        });
    });
});

module.exports = router; //Geef deze router terug aan app.js
