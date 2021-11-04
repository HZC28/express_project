var $mysql = require("mysql");
var sql = require("../../../public/sql/mysql.js"); //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql) //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect()
let {token_fun,ticket_fun}=require("../../../public/util/token.js")
var request = require('request');

// 新增草稿

// 50_OskH-iFb1JhD_iOLBx12cdfp2b5o7S7zskLOLn-JDStVRE4jvvY__Uj75X_OY5HYQb-yHFXwkSvKJQKKT0Bc4Eqq8SDPqwtBbClae7EaUVRSxtJG6lrlMXMMctyrjapt3-WxFypF-G3jYnklGZEjACAJCH
async function getbatchget(req, res, next) {
    let token=await token_fun()
    console.log(token)
    let params={
        url:`https://api.weixin.qq.com/cgi-bin/draft/add?access_token=${token}`,
        method:"POST",
        json: true,
        headers: {
            "content-type": "application/json"
        },
        body:JSON.parse(JSON.stringify({
            articles: [
                {
                    title:"TITLE",
                    author:"AUTHOR",
                    digest:"DIGEST",
                    content:"CONTENT",
                    thumb_media_id:"3CBkfFUZZbnZoPnxtVJBRaEzZ8JqEDKmUFhYUzL2orQi_kCfFHeB4Y2LB28EK9xz"
                }
            ]
        }))
    }
    request(params,function(error, response, body){
        console.log(response.body,123)
        res.send(response.body)
    })
}
module.exports = getbatchget