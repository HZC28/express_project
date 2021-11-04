var $mysql = require("mysql");
var sql = require("../../../public/sql/mysql.js"); //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql) //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect()
let {token_fun,ticket_fun}=require("../../../public/util/token.js")
var request = require('request');
let code = "001fVK0w3olv7X2XTZ2w3lkcLm0fVK0N"
let APPID = 'wx3fdda51ff31c80b8'
let secret = '140d7dca74627817725872e9b6eb366f'

// 短链接重定向到授权url

// 50_OskH-iFb1JhD_iOLBx12cdfp2b5o7S7zskLOLn-JDStVRE4jvvY__Uj75X_OY5HYQb-yHFXwkSvKJQKKT0Bc4Eqq8SDPqwtBbClae7EaUVRSxtJG6lrlMXMMctyrjapt3-WxFypF-G3jYnklGZEjACAJCH
async function test(req, res, next) {
    let token=await token_fun()
    console.log(token)
    let params={
        url:`https://api.weixin.qq.com/cgi-bin/freepublish/get?access_token=${token}`,
        methods:"POST",
        body:JSON.parse(JSON.stringify({
            publish_id:""
        }))
    }
    require(params,function(error, response, body){
        console.log(response)
        res.send(response)
    })
    // res.send("")
}
module.exports = test