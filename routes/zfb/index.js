var express = require('express');
const bodyParser = require('body-parser');
let jsonParser = bodyParser.json({
    extended: false
}) // 解析json类型
var router = express.Router();
var $mysql = require("mysql");
var sql = require("../../public/sql/mysql.js"); //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql) //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect() //运用了这句才是真正连接
let test = require('./api/trade.js')
let h5 = require("./api/h5.js")
let pc = require("./api/pc.js")
let query_h5 = require("./api/query_h5.js")
let query_pc = require("./api/query_pc.js")
let return_url=require("./api/return_url.js")
let refund=require("./api/refund.js")
let refund_query=require("./api/refund_query.js")
let downloadurl=require("./api/downloadurl.js")
/* GET home page. */
router.get('/zfb/test', function (req, res, next) {
    test(req, res, next)
});
router.get('/zfb/h5', function (req, res, next) {
    h5(req, res, next)
});
router.get('/zfb/pc', function (req, res, next) {
    pc(req, res, next)
});
router.get('/zfb/query_h5', function (req, res, next) {
    query_h5(req, res, next)
});
router.post('/zfb/return_url', function (req, res, next) {
    return_url(req, res, next)
});
router.get('/zfb/query_pc', function (req, res, next) {
    query_pc(req, res, next)
});
router.post('/zfb/refund', function (req, res, next) {
    refund(req, res, next)
});
router.post('/zfb/refund_query', function (req, res, next) {
    refund_query(req, res, next)
});

router.get('/zfb/downloadurl', function (req, res, next) {
    downloadurl(req, res, next)
});
module.exports = router;