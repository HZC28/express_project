var createError = require('http-errors');
// 加载定时器
require("./public/trigger/trigger.js")
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let jwt = require("jsonwebtoken")
let fs = require('fs')
var app = express();
// 对post方法body参数的解析插件
const bodyParser = require('body-parser');
app.use(bodyParser.json())
// view engine setup
// 加载swagger配置
require('./swagger/index')(app)
// 加载接口路由
var userRouter = require('./routes/user/index')
var bookRouter = require('./routes/book/index');
var fileRouter = require('./routes/file/index')
var testRouter = require('./routes/test/index')
var shopRouter = require('./routes/shop/index')
var wxapiRouter = require('./routes/wxapi/index')
let linkRouter=require("./routes/link/index")
let md5Router=require("./routes/md5/index")
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

// 日志打印配置
// 自定义token
// tokens['remote-addr'](req,res), //远程地址
// tokens['remote-user'](req,res), //远程用户
// tokens['http-version'](req,res),    //http版本
// tokens.res(req, res, 'content-length'), '-',    //请求长度
// tokens['response-time'](req, res), 'ms',        //响应时间
// tokens['user-agent'](req,res),      //浏览器信息
// 自定义format，其中包含自定义的token
logger.token('localDate', function getDate(req) {
  let date = new Date();
  return date.toLocaleString()
})
logger.token('token', function getDate(req) {
  jwt.verify(req.headers.token, "abc", (err, decode) => {
    if (err) {
      return null
    } 
    return decode.username
  })
})
logger.format('combined', `:remote-addr [:token]  - :remote-user [:localDate]] ":method :url HTTP/:http-version" :status ":response-time" :res[content-length] ":referrer" ":user-agent"`);
logger.format()
// 使用自定义的format
app.use(logger('combined'));
// app.use(logger('dev'));
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a'
});
app.use(logger('combined', {
  stream: accessLogStream
}));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
  // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验 
  var reg = /([?][^/]+)$/;
  var url = req.url.replace(reg, "");
  console.log(url)
  // 登录注册接口不判断token
  if (url != '/user/login' && url != '/user/register') {
    let token = req.headers.token;
    // 验证token是否过期，或者没有携带token的返回401
    jwt.verify(token, "abc", (err, decode) => {
      if (err) {
        res.status(401)
        res.json({
          code: '401',
          msg: '当前未登录！',
          result: ''
        })
        res.end()
      } else {
        next()
      }
    })
  } else {
    next();
  }
  // next()
});
// 接口路由配置
app.use(userRouter);
app.use(bookRouter);
app.use(fileRouter);
app.use(testRouter);
app.use(shopRouter);
app.use(wxapiRouter);
app.use(linkRouter);
app.use(md5Router);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
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
var server = app.listen(app.get('port'), '0.0.0.0', function () {
  debug('Express server listening on port ' + server.address().port);
});
// nodemon app.js
// module.exports = app;



// nodemon app.js 