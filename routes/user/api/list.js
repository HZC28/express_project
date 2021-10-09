var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
let jwt = require("jsonwebtoken")
const sequelize=require("../../../public/sequelize/index")
const WebSite=require("../../../public/Model/user.js")

$sql.connect() 
async function list(req, res, next) {
    // parseInt(req.query.current)
    let arr=['name','age','img','password','role','company','phone','email']
    let query={}
    let current=parseInt(req.query.current)>=1?parseInt(req.query.current):1
    let page=parseInt(req.query.page)>=1?parseInt(req.query.page):2
    // console.log(Object.keys(req.query))
    arr.forEach(val=>{
        if(req.query[val]!=undefined&&req.query[val]!=''){
            query[val]=req.query[val]
        }  
    })
    console.log(query)
    await sequelize.sync();
    let x = await WebSite.findAll({ 
        limit: page,
        offset: page*(current-1),
        where:query,
        // attributes: ['file_id', 'file_address', 'file_name','user']
    })
    let count = await WebSite.count({
        where:query
    })
    let data={}
    data.list=x;
    data.total=count
    res.send(data)
    console.log(page*(current-1))
    // $sql.query(thesql,[name],async function (err, result) {
    //     res.send("list")
    // })
}
module.exports=list