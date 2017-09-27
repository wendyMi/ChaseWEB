var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

//**************************pages**********************
//*****************************************************
var login = require('./routes/login');
var join = require('./routes/join');
var main = require('./routes/main');
var qna=require('./routes/qna');
var qna_board=require('./routes/qna_board');
var fnq=require('./routes/fnq');
var fnq_board=require('./routes/fnq_board');
var material=require('./routes/material');
var material_board=require('./routes/material_board');
var mypage=require('./routes/mypage');
var student=require('./routes/student');
var user_info=require('./routes/user_info');
var myquestion=require('./routes/myquestion');
var mail=require('./routes/mail');
var send=require('./routes/send');
var read=require('./routes/read');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//**************************pages**********************
//*****************************************************
app.post('/join',join);
app.get('/join',join);

app.get('/login',login);
app.post('/login',login);

app.get('/main',main);

app.get('/material/:stage/:page',material);
app.get('/material_board',material_board);
app.post('/material_board',material_board);

app.get('/qna/:page',qna);
app.get('/qna_board',qna_board);
app.post('/qna_board',qna_board);

app.get('/fnq/:page',fnq);
app.get('/fnq_board',fnq_board);
app.post('/fnq_board',fnq_board);

app.get('/mypage',mypage);

app.get('/student/:page',student);
app.post('/student/:page',student);

app.get('/user_info',user_info);
app.post('/user_info',user_info);

app.get('/myquestion/:page',myquestion);

app.get('/mail/:page',mail);
app.get('/send',send);
app.post('/send',send);

app.get('/read/:mail_no',read);

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
  res.render('error');
});

module.exports = app;
