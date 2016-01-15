var express = require('express');
var session = require('express-session');
var multer = require('multer');
var upload = multer({dest:'public/upload/'});

var router = express.Router();

router.get('/', function(req, res) {
    res.render('upload/upload', {title:'Uploads'});
});

router.post('/', upload.single('files'), function(req, res){
    console.log(req.files);
    res.send('Uploaden gelukt');
});

module.exports = router;
