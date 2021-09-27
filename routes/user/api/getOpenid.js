var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect() 
var request = require('request');
let code="001fVK0w3olv7X2XTZ2w3lkcLm0fVK0N"
let APPID='wx8542cb3d7f85484e'
let secret='86387f73b21980e229cd7e07443aebf7'
async function getOpenid(req, res, next) {
    let result=await new Promise(function (resolve, reject) {
        request(`https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${secret}&js_code=${code}&grant_type=authorization_code`, function (error, response, body) {
            // console.log("false")
            // console.log(response.body)
            resolve(response.body)
        })
    })
    res.send(result)
}
module.exports=getOpenid