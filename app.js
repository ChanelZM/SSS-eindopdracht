//Alle variabelen.
var express = require('express');                           //Gebruik express voor deze app.
var path = require('path');                                 //Zodat je kunt navigeren door de mappen heen door middel van routes.
var bodyParser = require('body-parser');                    //Zodat input van de gebruiker uit de body kan worden gehaald en worden gebruikt.
var session = require('express-session');                   //Zodat wanneer de gebruiker inlogt dit wordt onthouden.
var multer = require('multer');                             //Zodat het verwerken van geüploade bestanden mogelijk is.
var mysql = require('mysql');                               //Zodat je query's in sql kunt opstellen
var myConnection = require('express-myconnection');         //Zodat je gegevens uit de database kann halen en er weer in stoppen.

var upload = multer({dest:'public/upload/'});

var homeRouter = require('./routes/home');                  //Stop de route naar ./routes/home in deze variabele
var loginRouter = require('./routes/login');                //Stop de route naar ./routes/login in deze variabele
var logoutRouter = require('./routes/logout');              //Stop de route naar ./routes/logout in deze variabele
var uploadRouter = require('./routes/upload');              //Stop de route naar ./routes/upload in deze variabele

var auth = function(req, res, next){                        //De functie voor het authenticeren van de gebruiker die is ingelogd.
    console.log(req.session);                               //Laat zien of er een sessie is.
    if(req.session && req.session.username === 'Chanel') {  //Als er een sessie is en de gebruikersnaam van deze gebruiker is Chanel
        return next();                                      //Ga dan verder met het volgende codeblok
    }
    else {                                                  //Zo niet
        return res.sendStatus(401);                         //Stuur een error
    }
};

var app = express();                                        //Gebruik voor app de express() functie.

//Hier maak je verbinding met de sql server door een aantal gegevens in te vullen
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'student',
    password: 'serverSide',
    port: 3000,
    database: 'student'
}, 'single'));


//De settings voor de view engine
app.set('views', path.join(__dirname, 'views'));            //De directory name staat gelijk aan de request van de browser. De views is wat de server
                                                            //teruggeeft als response.
app.set('view engine', 'ejs');                              //Gebruik EJS templating view engine

app.use(express.static('public'));                          //Statische folders staan in public



//body-Parser instellen
app.use(bodyParser.json());                                 //Dit vertelt dat alles uit de body in json moet worden geparsed req.body.
app.use(bodyParser.urlencoded({extended:true}));            //Dit vertelt dat alles uit de body in urlencoded moet worden geparsed req.body.


app.use(session({                                           //Eigenschappen van de sessie Middleware
    secret: 'DitIsGeheim',
    resave: true,                                           //Cookie waardes aanhouden.
    saveUninitialized: true
}));



//De routes
app.use('/', homeRouter)                                    //App, als de gebruiker naar de root wilt, gebruik dan de route in de volgende variabele
app.use('/login', loginRouter)                              //App, als de gebruiker naar de login wilt, gebruik dan de route in de volgende variabele
app.use('/logout', logoutRouter)                            //App, als de gebruiker naar de logout wilt, gebruik dan de route in de volgende variabele
app.use('/upload', uploadRouter)                            //App, als de gebruiker naar upload wilt, gebruik dan de route in de volgende variabele

app.get('/content', auth, function(req, res){               //Als de gebruiker naar /content wilt, voer eerst dan de functie uit in de variabele auth
    res.render('./content/home')                                      //Als deze klopt stuur dan dit naar de gebruiker.
});


app.listen(3000, function () {
    console.log("Running at port 3000")
});
