var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect() 
var request = require('request');
const querystring = require('querystring')

// 检查内容是否违规

let token="50_Hk_Bg-AonNGGupwf40c3ZS_rQ0kLpuFI58KeA1eyVUsge5V_ImVmMcRgaObVJOgOFJgYN-aT0FdssTYcbNvl_bSnL3ekeBhLxTjtziq6k4cpOBAv0SlKAKXMG7e5GhVMnzKsQGkivR2zeOMqDPCeAFAVHU"
async function msgcheck(req, res, next) {
    let query=req.body
    let obj={
        "version":2,
        "openid":"asdad",
        "scene":2,
        "content":"123131"
    }
    console.log(querystring.stringify(obj))
    let params={
        url: `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${token}`,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: obj
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