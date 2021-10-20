var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
let jwt = require("jsonwebtoken")
const sequelize=require("../../../public/sequelize/index")
const WebSite=require("../../../public/Model/encryption.js")
let {encrypt,decrypt}=require('../../../public/crypto.js')
const { Op } = require("sequelize");
$sql.connect() 
async function encryption(req, res, next) {
    let str=encrypt(req.body.password)
    console.log(JSON.stringify(str))
    await sequelize.sync();
    let x;
    try{
        x=await WebSite.create({
            username:req.body.username,
            password:JSON.stringify(str)
        })
    }catch(err){
        res.send({
            code:100,
            msg:"用户名已注册"
        })
        return
    }
    let obj=JSON.parse(JSON.stringify(x))
    obj['code']=200
    res.send(x)
}
module.exports=encryption
