var express = require('express');
var router = express.Router();
var $mysql   = require("mysql");
var sql = require("../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect()                          //运用了这句才是真正连接
let login =require('./api/login')
let changeUserInfo=require("./api/changeUserInfo")
let registered=require("./api/register")
let getOpenid=require("./api/getOpenid")
let cancellation=require('./api/cancellation')

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log(req)
  res.send("213213")
});

// 登录方法
router.get('/user/login', function(req, res, next) {
    login(req, res, next)
});

// 修改个人信息
router.get('/user/changeUserInfo', function(req, res, next) {
  changeUserInfo(req, res, next)
});

// 注册方法
router.get('/user/registered', function(req, res, next) {
  registered(req, res, next)
});

// 注销方法
router.get('/user/cancellation', function(req, res, next) {
  cancellation(req, res, next)
});

router.post('/user/test', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log(req.body)
  res.send(req.query)
});

// https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
router.get('/user/getOpenid', function(req, res, next) {
  getOpenid(req, res, next)
});



module.exports = router;

