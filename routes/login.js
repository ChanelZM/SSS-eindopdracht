var express = require('express');
var session = require('express-session');

var router = express.Router();
//var users = require('../data/users');

router.get('/', function (req, res) {
    res.render('login/login.ejs');
});

router.post('/', function (req, res) {
    console.log(req.body);
//    res.locals.users = users;
//    res.send('Welkom ' + req.body.username);
//    for(var i=0; i < users.length; i++){
//        console.log(users.length);
//    if ((req.body.username == users[i].username) && (req.body.password == users[i].password)) {
//        res.send('Welkom ' + req.body.username);
//    } else if ((req.body.username == users[i].username) || (req.body.password == users[i].password)) {
//        res.send('Oeps! je wachtwoord of gebruikersnaam is fout!');
//    } else {
//        res.redirect('/login');
//    }
//
    if ((req.body.username == 'Chanel') && (req.body.password == 'jemoeder')) {
        req.session.username = 'Chanel';
        req.session.admin = true;
        res.locals.username = req.body.username;
        res.render('content/home');
        console.log('Inlog oke', req.session);
   } else if ((req.body.username == 'Chanel') || (req.body.password == 'jemoeder')) {
       res.render('Error/loginerror');
    } else {
        res.render('Error/nouser');
    }
    });

module.exports = router; //Geef deze router terug aan app.js
