var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect() 
var request = require('request');
let code="001fVK0w3olv7X2XTZ2w3lkcLm0fVK0N"
let APPID='wxb55302fba51c9a26'
let secret='51c44e249ff524a9a45e6d4cc8ae1510'
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
            resolve(response.body)
        })
    })
    // 50_QZbO-oLM8Zaq4oSDAS665j41Gdzpmx6PGopZR2c965qSHzmYsjuFLeOOpZhglvvze_CrkE5dIDH-LEzgfIkYhD2VMJbNep1Bc-Gj933mtl2jAQ7y-wv3W2brrz3HPMMCQMDSNZ9EhAvujivsQIIaAFAKCC
    // https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
    res.send(result)
}
module.exports=getOpenid