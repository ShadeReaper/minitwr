var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var accueil = require('./routes/accueil');
var indexv2 = require('./routes/indexv2');
var formu = require('./routes/formu');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexv2);
app.use('/accueil', accueil);
app.use('/formu', formu);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

var users = {
	'admin' : 'adminpass'
}

passport.use(new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password'
},
function(username, password, done) {
	if (users[username] != password) {
		return done(null, false, {message : "Les informations entrées n'ont pas permis de vous authentifier"});
	}
	else {
		return done(null, {username : username});
	}
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(username, done) {
	if (users[username])
		done(null, {username : username});
	else
		done(new Error("L'utilisateur" + username + "n'existe pas"));
});

/*Lancer le serveur : DEBUG=minitwr:* ./bin/www */
