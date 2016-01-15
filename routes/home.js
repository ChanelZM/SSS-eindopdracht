var express = require('express');
var router = express.Router();


router.get('/', function(req, res){
    res.render('upload/upload')
});



module.exports = router;                                    //Geef deze router terug aan app.js
