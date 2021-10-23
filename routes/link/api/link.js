var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
let jwt = require("jsonwebtoken")
const sequelize=require("../../../public/sequelize/index")
const WebSite=require("../../../public/Model/link.js")
const { Op } = require("sequelize");
$sql.connect() 
async function getLongShort(req, res, next) {
    let page=(req.body.page&&req.body.page!=undefined)?parseInt(req.body.page):1
    let pageSize=parseInt(req.body.pageSize)
    let arr=["shortlink"]
    // 'company'
    let query={}
    arr.forEach(val=>{
        if(req.body[val]!=undefined&&req.body[val]!=''){
            query[val]=req.body[val]
        }  
    })
    if(req.body['title']!=undefined&&req.body['title']!=''){
        query['title']={
            [Op.like]: `%${req.body['title']}%`
        }
    }
    if(req.body["longlink"]!=undefined&&req.body["longlink"]!=''){
        query["longlink"]={
            [Op.like]: `%${req.body["longlink"]}%`
        }
    }
    console.log(query)
    let x=await WebSite.findAndCountAll({
        limit: pageSize,
        offset: pageSize*(page-1),
        where:query
    })
    res.send(x)
}
module.exports=getLongShort
