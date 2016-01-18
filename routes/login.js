var express = require('express');
var session = require('express-session');

var router = express.Router();

router.get('/', function(req, res){                                 //Vraagt de gebruiker de login aan
    if (req.session && req.session.username === 'Chanel'){
        res.render('Error/loggedin');
    } else {
        res.render('login/login');                                      //Geef dan dit bestand weer
    }
});

router.post('/', function (req, res) {                              //Als de gebruiker op submit klikt
    console.log(req.body);                                          //Geef wat is ingevoerd weer in de console
    if ((req.body.username == 'Chanel') && (req.body.password == 'chanelchanel')) { //Als de ingevulde gebruikersnaam en wachtwoord matchen
        req.session.username = 'Chanel';                            //Is de gebruikersnaam sessie Chanel
        req.session.admin = true;                                   //Ben je de admin
        res.locals.username = req.body.username;                    //Om de gebruikersnaam in het ejs bestand te gebruiken.
        res.render('content/home');                                 //Geef dit bestand weer
        console.log('Inlog oke', req.session);                      //Geef dit en de sessie gegevens weer in de console
    } else if ((req.body.username == 'Chanel') || (req.body.password == 'chanelchanel')) {//Als een van de twee niet kloppen
        res.render('Error/loginerror');                             //Render dan dit bestand
    } else {                                                        //Anders
        res.render('Error/nouser');                                 //Render dan dit bestand
    }
});

module.exports = router;                                            //Geef deze router terug aan app.js
