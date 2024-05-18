var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const xXssProtection = require("x-xss-protection");
const helmet = require("helmet");
// var bodyParser        =     require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dataRouter = require('./routes/reg1');
var cors = require('cors')
var app = express();
app.disable('x-powered-by');
// app.use(bodyParser.json({ limit: '100mb' }));
app.use(xXssProtection());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(helmet.noSniff());
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader("X-XSS-Protection", "1; mode=block");

  
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/jseed', dataRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
   res.locals.message = err.message;
   res.locals.error = req.app.get('env') === 'development' ? err : {};
   res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
   res.setHeader("X-XSS-Protection", "1; mode=block");
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // next();
   
  // render the error page
  res.status(err.status || 500);

  // res.render('error');
  res.send(404);

});

module.exports = app;
