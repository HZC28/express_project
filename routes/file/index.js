var express = require('express');
var router = express.Router();
var $mysql   = require("mysql");
var sql = require("../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect()                          //运用了这句才是真正连接
let getFile =require('./api/uploadFile.js')
let loadFile=require("./api/loadFile")
let parsingFile=require('./api/parsingFile')
// 上传文件
router.post('/file/uploadFile', function(req, res, next) {
    getFile(req, res, next)
});
// 下载文件
router.get('/file/loadFile', function(req, res, next) {
    loadFile(req, res, next)
});
// 下载文件
router.get('/file/parsingFile', function(req, res, next) {
    parsingFile(req, res, next)
});



module.exports = router;

