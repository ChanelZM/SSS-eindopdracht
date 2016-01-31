var express = require('express');
var session = require('express-session');
var multer = require('multer');
var bodyParser = require('body-parser');
var fs = require('fs');

var upload = multer({                                                   //Stop een functie van multer in upload
    dest: 'public/upload/'                                              //Alle foto's die worden geüpload gaan naar deze map.
});

var router = express.Router();                                          //Gebruik de functie Router van express en stop deze in variabele router

router.get('/', function (req, res, next) {                             //Wordt uploads aangevraagd
    fs.readdir('public/upload', function (err, files) {                 //Lees dan de bestanden uit de upload map
        res.locals.photo = files;                                       //De bestanden worden opgeslagen in variabele photo
        res.render('uploads/upload', {                                  //Render deze pagina
            title: 'Uploads'
        });
    });
});

router.get('/:foto', function (req, res, next){                         //Als de gebruiker een foto nader wilt bekijken
    var foto = req.params.foto;                                         //Sla wat er achter de slash komt op in deze variabele

    req.getConnection(function(error, connection){                      //Vraag om connectie met database
        if (error) return next(error);                                  //Geen connectie geef error

        connection.query('SELECT * FROM photos WHERE filename=?', [foto], function(error, result){ //Voer de query uit waar filename matched met photo
            var photoID = result[0].id;                                 //sla de id op die uit de query is gekomen in photoID

            connection.query('SELECT comment FROM comments WHERE photo_id=?', [photoID], function(error, result){ //sla comment op met de photoID
                res.locals.comment = result;                            //Sla het resultaat op in comment
            });

            connection.query('SELECT * FROM photos WHERE filename=?', [foto], function(error, result){//Voer query uit om bijbehorende foto te zien
                res.locals.photo = result[0];                           //Sla het resultaat op in photo
                res.render('uploads/photo');                            //Render de photo pagina
            });
        });
    });
});


router.post('/:foto', upload.single('comment'), function (req, res, next){//Wilt de gebruiker iets commenten
    var foto = req.params.foto;                                         //Sla wat er achter de slash komt op in deze variabele
    req.getConnection(function(error, connection){                      //Vraag om connectie met database
        if (error) return next(error);                                  //Geen connectie geef error

        connection.query('SELECT * FROM photos WHERE filename=?', [foto], function(error, result){//Voer query uit waar filename de photo is
            var photoID = result[0].id;                                 //Sla het resultaat op in photoID
            var comment = req.body.comment;                             //Sla de gegeven comment op in comment
            var data = {                                                //Variabele met de data die nodig is voor een comment op te slaan
                photo_id: photoID,                                      //de photo_id is het resultaat van de query
                comment: req.body.comment,                              //De comment is de gegeven comment van de gebruiker
            }

            connection.query('INSERT INTO comments SET ?', [data], function(error, result){//Sla de comment op met de gegevens in data
                res.redirect(req.get('referer'));
            });
        });
    });
});

router.post('/', upload.single('files'), function (req, res) {          //Wilt de gebruiker een bestand uploaden, stop deze dan in upload
    console.log(req.file);                                              //Laat de gegevens van het bestand zien in de console
    fs.rename(                                                          //Hernoem het bestand dat is geüpload
        req.file.path,
        req.file.destination + req.file.originalname                    //Geef de originele naam mee van het bestand naar de locatie en path en niet de                                                                         //standaard stringnaam
    );
    req.getConnection(function (error, connection, files) {             //Vraag naar de connectie met de database
        var data = {
                filename: req.file.originalname
        };

        if (error) return next(error);
        connection.query('INSERT INTO photos SET ?', [data], function (error, result) {
            if (error) return next(error);                              //Werkt de query niet
            var resultaten = result;                                    //Stop het resultaat in deze variabele.
            console.log(resultaten);                                    //Geef deze dan weer in de console.
        });
    });
    fs.readdir('public/upload', function (error, files) {
       if (error) { //Werkt het niet
        console.log('Hij doet het niet :(');                            //Laat dit in de console zien
    } else { //Anders
        res.locals.photo = files;                                       //Sla de geuploade bestanden op in de variabele photo die dan gebruikt kan
                                                                        //worden n het volgende ejs bestand.
        res.render('uploads/upload', {                                   //Geef dan deze pagina weer
            title: 'Uploads'
        });
    };
    });
});

module.exports = router; //Geef deze router terug aan app.js
