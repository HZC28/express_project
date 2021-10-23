var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect() 
var request = require('request');
// 小商店
let code="001fVK0w3olv7X2XTZ2w3lkcLm0fVK0N"
let APPID='wx3fdda51ff31c80b8'
let secret='140d7dca74627817725872e9b6eb366f'
// 50_OskH-iFb1JhD_iOLBx12cdfp2b5o7S7zskLOLn-JDStVRE4jvvY__Uj75X_OY5HYQb-yHFXwkSvKJQKKT0Bc4Eqq8SDPqwtBbClae7EaUVRSxtJG6lrlMXMMctyrjapt3-WxFypF-G3jYnklGZEjACAJCH
async function getOpenid(req, res, next) {
    // let result=await new Promise(function (resolve, reject) {
    //     request(`https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${secret}&js_code=${code}&grant_type=authorization_code`, function (error, response, body) {
    //         // console.log("false")
    //         // console.log(response.body)
    //         resolve(response.body)
    //     })
    // })
    let result=await new Promise(function (resolve, reject) {
        request(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${secret}`, function (error, response, body) {
            // console.log("false")
            // console.log(response.body)
            resolve(response.body)
        })
    })
    // https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
    res.send(result)
}
module.exports=getOpenid