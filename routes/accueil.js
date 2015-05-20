var express = require('express');
var router = express.Router();

var tweets = [];



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('accueil', { title: 'Accueil', tweets: tweets});
});

router.post('/', function(req, res, next) {
    tweets.unshift({
		tpost: req.body.tweet,
		pseudo: req.body.pseudo
	});
    res.redirect('/accueil');
});

module.exports = router;
 
