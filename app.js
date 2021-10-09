var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let jwt = require("jsonwebtoken")

var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())
// view engine setup
require('./swagger/index')(app)
var userRouter = require('./routes/user/index')
var bookRouter = require('./routes/book/index');
var fileRouter=require('./routes/file/index')
var testRouter=require('./routes/test/index')
// 解决跨域请求问题
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", '3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验 
  var reg = /([?][^/]+)$/;
  var url =req.url.replace(reg, "");
  if (url != '/user/login' && url != '/user/register') {
      let token = req.headers.token;
      jwt.verify(token,"abc",(err,decode)=>{
        //第一个参数传递token
        //第二个参数解密规则
        //回调函数
        // console.log("decode",decode);
        if(err){
          // res.status="401 Unauthorized";
          // res.render('error');
          res.status(401)
          res.json({
            code: '401',
            msg: '当前未登录！',
            result: ''
          })
          res.end()
        }else{
            next()
        }                    
    })
  } else {
      next();
  }
  // next()
});
app.use(userRouter);
app.use(bookRouter);
app.use(fileRouter);
app.use(testRouter);


// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

var debug = require('debug')('my-application'); // debug模块
app.set('port', process.env.PORT || 3000); // 设定监听端口



//启动监听
var server = app.listen(app.get('port'),'0.0.0.0', function() {
  debug('Express server listening on port ' + server.address().port);
});
// nodemon app.js
// module.exports = app;



// nodemon app.js 
