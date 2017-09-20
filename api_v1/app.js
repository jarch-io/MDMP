var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes');
var parseUrl = require('./util/parseUrl');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//adecuando todas las respuestas
app.use(function (req,res,next) {
  //validar aqui el token

  //creamos una variable en req donde indique la ruta url al archivo
  req.jio = {
    domain : req.protocol+"://"+req.hostname+":3000",
    fields : "",
    params : {}
  };
  
  //todas nuestras respuestas seran en formato JSON
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Methods","PUT");

  //parseamos la url en busca de campos especiales {:(name,nameN)::name(value)::nameN(valueN)}
  if(/:/g.test(req.url)){
    var parser = parseUrl(req.url);

    if(parser.getFields().lenght != 0) req.jio.fields = parser.getFields().join(" ");
    req.jio.params = parser.getParams();

    req.url = req.url.replace(/:.*$/g,"");
  }

	next();
});

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  err.status = err.status || 500;
  
  if(req.app.get('env') === 'development'){
  	res.jsonp({error : {code : err.status, message : err.message, errors : err.errors, stack : err.stack}});
  }else{
    if(err.status == 500) err.message = "Estamos presentando incovenientes en el servidor. Estamos trabajando para solucionarlos.";
  	res.jsonp({error : {code : err.status, message : err.message, errors : err.errors}});
  }
});

module.exports = app;
