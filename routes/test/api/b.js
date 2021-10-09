var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
let jwt = require("jsonwebtoken")
const sequelize=require("../../../public/sequelize/index")
const WebSite=require("../../../public/Model/user.js")

$sql.connect() 
async function a(req, res, next) {
    let time=new Date().getFullYear()+'-'+new Date().getMonth()+'-'+new Date().getDate()+' '+new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()
    let arr=['name','age','img','password','role','company','phone','email']
    let query={}
    query.role=3
    arr.forEach(val=>{
        if(req.query[val]!=undefined&&req.query[val]!=''){
            query[val]=req.query[val]
        }  
    })
    let data={
        code:200,
        msg:"注册成功"
    }
    query.changeTime=time
    console.log(query)
    await sequelize.sync();
    try {
        let x = await WebSite.create(query)
        //运行代码
      } catch(err) {
        data={
            code:100,
            msg:"用户名已存在"
        }
      }
      res.send(data)
}
module.exports=a