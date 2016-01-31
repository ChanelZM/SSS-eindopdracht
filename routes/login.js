var express = require('express');
var session = require('express-session');

var router = express.Router();

router.get('/', function(req, res){                                     //Vraagt de gebruiker de login aan
    if (req.session.username){                                          //Ben je ingelogd
        res.render('Error/loggedin');                                   //Dan wordt deze error gerenderd
    } else {                                                            //Anders
        res.render('login/login');                                      //Geef dan dit bestand weer
    }
});



router.post('/', function(req, res) {                                   //Als de gebruiker op submit klikt
    var username = req.body.username;                                   //Sla de username die is ingevoerd op in deze variabele
    var password = req.body.password;                                   //Sla de password die is ingevoerd op in deze variabele

    req.getConnection(function(err, connection){                        //Maak connectie met de database
        connection.query('SELECT * FROM users WHERE name=? AND password=?', [username, password], function(error, result){ //Haal de gebruiker op
            if (result[0]) {                                            //Is er een resultaat
                req.session.username = username;                        //Sla deze dan op in de sessie
                req.session.admin = true;                               //Dit is dan de admin
                res.locals.username = req.body.username;                //De ingevoerde username kan nu ergens anders worden gebruikt.
                res.render('content/home');                             //Render dan deze pagina
            } else if ((!username) || (!password)) {                    //Als één van de twee goed is.
                res.render('Error/loginerror');                         //Render dan deze pagina
            } else {                                                    //Overig
                res.render('Error/nouser');                             //Render  deze pagina
            };
        });
    });
});

module.exports = router;                                                //Geef deze router terug aan app.js
