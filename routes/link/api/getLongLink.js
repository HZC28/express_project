var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
let jwt = require("jsonwebtoken")
const sequelize=require("../../../public/sequelize/index")
const WebSite=require("../../../public/Model/link.js")
const { Op } = require("sequelize");
$sql.connect() 
async function getLongShort(req, res, next) {
    let x=await WebSite.findAndCountAll({
        where:{
            shortlink:req.params.short
        }
    })
    if(x.count==0){
        res.send({
            code:100,
            url:""
        })
        return
    }
    res.send({
        code:200,
        url:x.rows[0].longlink
    })
}
module.exports=getLongShort
