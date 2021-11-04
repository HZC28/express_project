var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect() 
let {token_fun,ticket_fun}=require("../../../public/util/token.js")
var request = require('request');
let code="001fVK0w3olv7X2XTZ2w3lkcLm0fVK0N"
let APPID='wx3fdda51ff31c80b8'
let secret='140d7dca74627817725872e9b6eb366f'

// 批量获取关注用户
// 50_OskH-iFb1JhD_iOLBx12cdfp2b5o7S7zskLOLn-JDStVRE4jvvY__Uj75X_OY5HYQb-yHFXwkSvKJQKKT0Bc4Eqq8SDPqwtBbClae7EaUVRSxtJG6lrlMXMMctyrjapt3-WxFypF-G3jYnklGZEjACAJCH
async function getUser(req, res, next) {
    let token=await token_fun()
    let next_openid=''
    console.log(token)
    let result=await new Promise(function (resolve, reject) {
        request(`https://api.weixin.qq.com/cgi-bin/user/get?access_token=${token}&next_openid=${next_openid}`, function (error, response, body) {
            resolve(response.body)
        })
    }) 
    res.send(result)
}
module.exports=getUser