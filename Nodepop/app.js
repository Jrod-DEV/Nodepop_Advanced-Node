var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Loading environment variables
require('dotenv').config();

var app = express();

// Mongoose connection
require('./lib/connectMongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

// Variables for all views
app.locals.title = 'Nodepop';

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setup i18n
const i18n = require('./lib/i18nSetup');
app.use(i18n.init);

/**
 * Website Routes
 */
app.use('/', require('./routes/index'));
app.use('/adverts', require('./routes/adverts'));
app.use('/change-locale', require('./routes/change-locale'));

/**
 * API Routes
 */
const loginController = require('./routes/api/authController')

app.use('/api/adverts', require('./routes/api/adverts'));
app.post('/api/authenticate', loginController.post);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  console.log(err);
  if (err.array) {
    // Validation error
    err.status = 422;
    const errINFO = err.array({ onlyFFirstError: true })[0];
    err.message = `The param ${errINFO.param} ${errINFO.msg}`;
  }

  res.status(err.status || 500);

  if (req.originalUrl.startsWith('/api/')) {
    // API request
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;
