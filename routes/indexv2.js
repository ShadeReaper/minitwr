var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next) {
  res.render('indexv2', { title: 'Watcher' });
});

module.exports = router;
