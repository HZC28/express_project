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
// http://192.168.1.99:3000/wxapi/redirect
module.exports = router;

