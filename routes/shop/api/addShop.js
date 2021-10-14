var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
let jwt = require("jsonwebtoken")
const sequelize=require("../../../public/sequelize/index")
const Shop=require("../../../public/Model/shop.js")
const { Op } = require("sequelize");
$sql.connect() 
// 添加商品
async function addShop(req, res, next) {
    console.log(req.query)
    await sequelize.sync();
    let x = await Shop.create(req.query)
    res.send("shop")
}
module.exports=addShop