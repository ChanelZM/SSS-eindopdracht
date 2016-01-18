var express = require('express');
var session = require('express-session');
var multer = require('multer');
var bodyParser = require('body-parser');
var fs = require('fs');

var upload = multer({ //Stop een functie van multer in upload
    dest: 'public/upload/' //Alle foto's die worden geüpload gaan naar deze map.
});

var router = express.Router(); //Gebruik de functie Router van express en stop deze in variabele router

router.get('/', function (req, res, next) {
    fs.readdir('public/upload', function (err, files) {
        if (err) throw err;
        res.locals.photo = files;
        res.render('upload/upload', {
            title: 'Uploads'
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
        res.render('upload/upload', {                                   //Geef dan deze pagina weer
            title: 'Uploads'
        });
    };
    });
});

module.exports = router; //Geef deze router terug aan app.js
