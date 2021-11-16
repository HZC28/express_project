var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect() 
var request = require('request');
let {token_fun,ticket_fun}=require("../../../public/util/token.js")
const querystring = require('querystring');
// 自定义菜单
async function query_menus(req, res, next) {
    let token=await token_fun()
    let obj={}
    console.log(token)
    let url=`https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info?access_token=${token}`
    let result=await new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            resolve(response.body)
        })
    })
    res.send(result)
}
module.exports=query_menus


