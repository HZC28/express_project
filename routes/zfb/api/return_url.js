// 获取JSSDK签名

var $mysql = require("mysql");
var sql = require("../../../public/sql/mysql.js"); //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql) //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect()
const AlipayFormData = require("alipay-sdk/lib/form").default;
// 支付宝回调函数
const crypto = require('crypto');
let query=require("../methods/query.js")
var request = require('request');
const  alipaySdk=require("../../../public/alipayUtil.js")
let APPID = '2021000118638070'
// 50_OskH-iFb1JhD_iOLBx12cdfp2b5o7S7zskLOLn-JDStVRE4jvvY__Uj75X_OY5HYQb-yHFXwkSvKJQKKT0Bc4Eqq8SDPqwtBbClae7EaUVRSxtJG6lrlMXMMctyrjapt3-WxFypF-G3jYnklGZEjACAJCH
async function trade(req, res, next) {
    console.log("return_url触发")
    console.log(req.body.out_trade_no)
    query(req.body.out_trade_no)
    res.send("return_url")
}
module.exports = trade
