var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect() 
var request = require('request');
let {token_fun,ticket_fun}=require("../../../public/util/token.js")
const querystring = require('querystring');
// 自定义菜单
async function menus(req, res, next) {
    let token=await token_fun()
    let obj=req.body
    // let obj={
    //     "button": [
    //         {
    //             "type": "click", 
    //             "name": "按钮一12212", 
    //             "key": "click_0_1"
    //         },
    //         {
    //             "type": "media_id", 
    //             "name": "模板", 
    //             "media_id": "Hj0JtoUlljiLJcaZR2lqDOtnea7jQFJjb7vlv2hVEJ54djNxhMQFQ5VaSMfnq1JR"
    //          }, 
    //         {
    //             "name": "测试跳转", 
    //             "sub_button": [
    //                 {
    //                     "type": "view", 
    //                     "name": "跳转",
    //                     "url":"https://www.nandao.tech/book"
    //                  },
    //                  {
    //                     "type": "view", 
    //                     "name": "跳转1",
    //                     "url":"https://www.nandao.tech/book"
    //                  }
    //             ]
    //         }
    //     ]
    //  }
     console.log(token)
     console.log(JSON.parse(JSON.stringify(obj)))
    let url=`https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${token}`
    let params={
        url:url,
        method:"POST",
        json: true,
        headers: {
            "content-type": "application/json"
        },
        body: JSON.parse(JSON.stringify(obj))
    }
    let result=await new Promise(function (resolve, reject) {
        request(params, function (error, response, body) {
            resolve(response.body)
        })
    })
    res.send(result)
}
module.exports=menus





