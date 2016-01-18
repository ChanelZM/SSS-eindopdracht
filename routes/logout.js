var express = require('express');
var session = require('express-session');

var router = express.Router();

router.get('/', function (req, res) {               //Vraagt de gebruiker de logout aan
    if (req.session && req.session.username === 'Chanel'){
        req.session.destroy();                          //Verwijder dan de sessie
        res.render('logout/logout.ejs');                //Geef dan dit bestand weer
    }else {
        res.render('./Error/notloggedin');
    };
});

module.exports = router;                            //Geef deze router terug aan app.js
