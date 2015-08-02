var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials'); //Quiz4
var methodOverride = require('method-override'); //M8edit
var session = require('express-session'); //M9Quiz16

var routes = require('./routes/index');
///var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials()); //Quiz4

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
///app.use(bodyParser.urlencoded({ extended: false }));  //comentada por M8cp
app.use(bodyParser.urlencoded()); //M8cp // para soportar los mapeos objeto[propiedad] en nombres de campos de formulario html !!
app.use(cookieParser('Quiz 2015 LuiXmi'));  //con el M9Quiz16 le ponemos una semilla para cifrar cookie.
app.use(session()); //Instalar MW sesion //M9Quiz16
app.use(methodOverride('_method')); //M8edit
app.use(express.static(path.join(__dirname, 'public')));

//M9Quiz16 Begin
//// Helpers dinamicos:
app.use(function(req, res, next) {
  //Guardar path en session.redir para después de login
  if (!req.path.match(/\/login|\/logout/)) {
     req.session.redir = req.path;
  }
  //Hacer visible req.session en las vistas
  res.locals.session = req.session;
  next();
});
//M9Quiz16 End

app.use('/', routes);
///app.use('/users', users);

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
            error: err,
			errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
		errors: []
    });
});


module.exports = app;
