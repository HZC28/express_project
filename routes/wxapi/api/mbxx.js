var $mysql = require("mysql");
var sql = require("../../../public/sql/mysql.js"); //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql) //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect()
let {token_fun,ticket_fun}=require("../../../public/util/token.js")
var request = require('request');

// 获取草稿列表

// 50_OskH-iFb1JhD_iOLBx12cdfp2b5o7S7zskLOLn-JDStVRE4jvvY__Uj75X_OY5HYQb-yHFXwkSvKJQKKT0Bc4Eqq8SDPqwtBbClae7EaUVRSxtJG6lrlMXMMctyrjapt3-WxFypF-G3jYnklGZEjACAJCH
async function mbxx(req, res, next) {
    let token=await token_fun()
    let obj={
        "touser":"o3HQo6wIoLqZDX4JUW3eho-hTLq8",
        "template_id":"Hm29Qhd8ciXDFEI1HqPmUs9_XmpHnz9N1gijFXd6d6I",
        "url":"http://weixin.qq.com/download"
    }
    console.log(token)
    let params={
        url:`https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${token}`,
        method:"POST",
        json: true,
        headers: {
            "content-type": "application/json"
        },
        body:obj
    }
    request(params,function(error, response, body){
        console.log(response.body,123)
        res.send(response.body)
    })
}
module.exports = mbxx



