var express = require('express');
const bodyParser = require('body-parser');
let jsonParser = bodyParser.json({extended:false}) // 解析json类型
var router = express.Router();
var $mysql   = require("mysql");
var sql = require("../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect()                          //运用了这句才是真正连接
let test=require('./api/trade.js')
let h5=require("./api/h5.js")
let pc=require("./api/pc.js")
/* GET home page. */
router.get('/zfb/test', function(req, res, next) {
  test(req, res, next)
});
router.get('/zfb/h5', function(req, res, next) {
    h5(req, res, next)
  });
  router.get('/zfb/pc', function(req, res, next) {
    pc(req, res, next)
  });

module.exports = router;