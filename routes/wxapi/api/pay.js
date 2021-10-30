var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect() 
let {token_fun,ticket_fun}=require("../../../public/util/token.js")
var request = require('request');
const querystring = require('querystring')
// 批量获取关注用户

// 50_OskH-iFb1JhD_iOLBx12cdfp2b5o7S7zskLOLn-JDStVRE4jvvY__Uj75X_OY5HYQb-yHFXwkSvKJQKKT0Bc4Eqq8SDPqwtBbClae7EaUVRSxtJG6lrlMXMMctyrjapt3-WxFypF-G3jYnklGZEjACAJCH
async function getUser(req, res, next) {
//     appid: wx8397f8696b538317   #微信公众账号或开放平台APP的唯一标识
//   partner: 1473426802         #财付通平台的商户账号
//   partnerkey: T6m9iK73b0kn9g5v426MKfHQH7X8rKwb  #财付通平台的商户密钥
//   notifyurl: http://www.itcast.cn 
    let params={
        url:"https://api.mch.weixin.qq.com/v3/pay/transactions/jsapi",
        method:"POST",
        json: true,
        headers: {
            "Accept":"application/json, text/plain, */*"
        },
        body: querystring.stringify({
            appid:"wx8397f8696b538317",
            mchid:"1473426802",
            description:"asdad",
            out_trade_no:"2021102815565316354078135337343525",
            notify_url:"http://www.itcast.cn",
            amount:{
                total:"100"
            },
            payer:{
                openid:""
            }
        })
    }
    let result=await new Promise(function (resolve, reject) {
        request(params, function (error, response, body) {
            resolve(response.body)
        })
    }) 
    res.send(result)
}
module.exports=getUser