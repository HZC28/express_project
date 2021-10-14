var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
let jwt = require("jsonwebtoken")
const sequelize=require("../../../public/sequelize/index")
const WebSite=require("../../../public/Model/user.js")
const { Op } = require("sequelize");
$sql.connect() 
// 分页获取用户
async function list(req, res, next) {
    // parseInt(req.query.current)
    let arr=['age','img','password','role']
    // 'company'
    let query={}
    let current=parseInt(req.query.currentPage)>=1?parseInt(req.query.currentPage):1
    let page=parseInt(req.query.pageSize)>=1?parseInt(req.query.pageSize):2
    // console.log(Object.keys(req.query))
    arr.forEach(val=>{
        if(req.query[val]!=undefined&&req.query[val]!=''){
            query[val]=req.query[val]
        }  
    })
    // 模糊查询
    if(req.query['company']!=undefined&&req.query['company']!=''){
        query['company']={
            [Op.like]: `%${req.query['company']}%`
        }
    }
    if(req.query['name']!=undefined&&req.query['name']!=''){
        query['name']={
            [Op.like]: `%${req.query['name']}%`
        }
    }
    if(req.query['phone']!=undefined&&req.query['phone']!=''){
        query['phone']={
            [Op.like]: `%${req.query['phone']}%`
        }
    }
    if(req.query['email']!=undefined&&req.query['email']!=''){
        query['email']={
            [Op.like]: `%${req.query['email']}%`
        }
    }
    await sequelize.sync();
    let x = await WebSite.findAll({ 
        limit: page,
        offset: page*(current-1),
        where:query
    })
    // 获取总数量
    let count = await WebSite.count({
        where:query
    })
    let data={}
    data.list=x;
    data.total=count
    res.send(data)
}
module.exports=list