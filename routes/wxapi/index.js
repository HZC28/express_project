var express = require('express');
const bodyParser = require('body-parser');
let jsonParser = bodyParser.json({extended:false}) // 解析json类型
var router = express.Router();
var $mysql   = require("mysql");
var sql = require("../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect()                          //运用了这句才是真正连接

let getToken=require("./api/getToken")
let getUser=require("./api/getUser")
let msgcheck=require("./api/msgcheck.js")
let redirect=require("./api/redirect.js")
let a=require("./api/a.js")
let getmsg=require("./api/getmsg.js")
let pay=require("./api/pay.js")
let menus=require("./api/menus.js")
let query_menus=require("./api/query_menus.js")
let test=require("./api/test.js")
let getbatchget=require("./api/getbatchget.js")
let addgetbatchget=require("./api/addgetbatchget.js")
let mbxx=require("./api/mbxx.js")
/* GET home page. */
router.get('/wxapi/getToken', function(req, res, next) {
  getToken(req, res, next)
});
router.get('/wxapi/getUser', function(req, res, next) {
  getUser(req, res, next)
});
router.post('/wxapi/msgcheck', function(req, res, next) {
  msgcheck(req, res, next)
});
router.get('/wxapi/redirect', function(req, res, next) {
  redirect(req, res, next)
});
router.get('/wxapi/a', function(req, res, next) {
  a(req, res, next)
});
router.get('/wxapi/getmsg', function(req, res, next) {
  getmsg(req, res, next)
});
router.post('/wxapi/getmsg', function(req, res, next) {
  getmsg(req, res, next)
});
router.post('/wxapi/pay', function(req, res, next) {
  pay(req, res, next)
});
router.post('/wxapi/menus', function(req, res, next) {
  menus(req, res, next)
});
router.get('/wxapi/query_menus', function(req, res, next) {
  query_menus(req, res, next)
});
router.get('/wxapi/test', function(req, res, next) {
  test(req, res, next)
});
router.get('/wxapi/getbatchget', function(req, res, next) {
  getbatchget(req, res, next)
});

router.post('/wxapi/addgetbatchget', function(req, res, next) {
  addgetbatchget(req, res, next)
});

router.post('/wxapi/mbxx', function(req, res, next) {
  mbxx(req, res, next)
});

// http://192.168.1.99:3000/wxapi/redirect
module.exports = router;