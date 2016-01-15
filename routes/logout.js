var express = require('express');
var session = require('express-session');

var router = express.Router();

router.get('/', function (req, res) {
    req.session.destroy();
    res.render('logout/logout.ejs');
});

module.exports = router;
