var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
let jwt = require("jsonwebtoken")
const sequelize=require("../../../public/sequelize/index")
const WebSite=require("../../../public/Model/encryption.js")
let {encrypt,decrypt}=require('../../../public/crypto.js')
const { Op } = require("sequelize");
$sql.connect() 
async function verify(req, res, next) {
    let str=encrypt(req.body.password)
    let s='{"iv":"03247b0f5df20a25f0f236533dd1b555","content":"02ac9cf2"}'
    console.log(decrypt(JSON.parse(s)))
    await sequelize.sync();
    let x=await WebSite.findAndCountAll({
       where:{
            username:req.body.username,
            password:JSON.stringify(str)
       }
    })
    res.send(x)
}
module.exports=verify
