var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
let jwt = require("jsonwebtoken")
const sequelize=require("../../../public/sequelize/index")
const WebSite=require("../../../public/Model/link.js")
const { Op } = require("sequelize");
$sql.connect() 
// 长链接转短链接
let time=0
async function longToShort(req, res, next) {
    time=0
    insertlink(res,req)
    
    
}
module.exports=longToShort

function randomWord(){
    var str = "",
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // 随机产生
    for(var i=0; i<12; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}

async function insertlink(res,req){
    // await sequelize.sync();
    time++
    let x;
    // let arr=[
    //     "131312313",
    //     "asdasdad",
    //     "dadqweq",
    //     "xsadadqq",
    //     "asdasdfasfd",
    //     "adsafrerewrq"
    // ]
    let short=await randomWord()
    // let short=arr[Math.round(Math.random() * (arr.length-1))]
    console.log("次数为"+time)
    let url=req.body.url
    try{
        x = await WebSite.create({ 
            longlink: url,
            shortlink:short
        })
    }catch(err){
        insertlink(res,req);
        return
    }
    res.send(x)
}