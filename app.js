var express = require('express');  
var path = require('path');
var favicon = require('serve-favicon');//请求网页的logo
var logger = require('morgan');//在控制台中，显示req请求的信息
var session = require('express-session');
var cookieParser = require('cookie-parser');//这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。
var bodyParser = require('body-parser');//node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。

// 路由信息（接口地址），存放在routes的根目录
var routes = require('./routes/index');

var app = express();

// view engine setup  模板开始
app.set('views', path.join(__dirname, 'views'));//设置视图根目录
app.engine("html",require("ejs").__express); // or   app.engine("html",require("ejs").renderFile);
// app.set('view engine', 'ejs');//设置视图格式（本人不太喜欢用jade，接下来会交大家使用html格式的文件）
app.set('view engine', 'html');//设置视图格式（本人不太喜欢用jade，接下来会交大家使用html格式的文件）

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// 载入中间件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//设置session
app.use(session({
  secret: "hello world",
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 10 * 60 * 60 * 1000}
}));

app.use(express.static(path.join(__dirname, 'public')));

var orgine = ['login','register'];

/* 中间件,判断用户是否登录 */
app.use(function (req, res, next) {
  var url = req.url;
  console.log(req.session.user);
  if (url != '/login' && url != '/register' && req.session.user === undefined) {
      res.redirect('/login');
      return;
  }
  res.locals.user = req.session.user;
  next();
});

//配置路由，（'自定义路径'，上面设置的接口地址）
app.use('/', routes);


// catch 404 and forward to error handler 错误处理
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
  console.log( err.message );

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
