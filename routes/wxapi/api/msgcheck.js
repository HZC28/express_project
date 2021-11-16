var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect() 
var request = require('request');
const querystring = require('querystring')
let {token_fun,ticket_fun}=require("../../../public/util/token.js")

// 检查内容是否违规


async function msgcheck(req, res, next) {
    let token=await token_fun()
    let query=req.body
    let obj={
        "version":2,
        "openid":"o3HQo64hXqxWdYFId1hOUkeQ9YDU",
        "scene":2,
        "content":"1111"
    }
    console.log(querystring.stringify(obj),112232)
    let params={
        url: `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${token}`,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: querystring.stringify(obj)
    }
    let result;
    if(query.type==0){
        
    }
    result=await new Promise(function (resolve, reject) {
        request(params, function (error, response, body) {
            resolve(response.body)
        })
    })
    res.send(result)
}
module.exports=msgcheck