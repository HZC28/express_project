var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
let jwt = require("jsonwebtoken")
const sequelize=require("../../../public/sequelize/index")
const Type=require("../../../public/Model/type.js")
const Shop=require("../../../public/Model/shop.js")
const { Op } = require("sequelize");
$sql.connect() 
// 获取全部分类下的全部商品
async function list(req, res, next) {
    // parseInt(req.query.current)
    let arr=['age','img','password','role']
    let query={}
    let list =JSON.parse(JSON.stringify(await Type.findAndCountAll()))
    for(let i=0;i<list.rows.length;i++){
        console.log(list.rows[i].id)
        let shoppes=await sqlfun(list.rows[i].id)
        // console.log(shoppes)
        list.rows[i]['shoppes']=JSON.parse(JSON.stringify(shoppes))
    }
    let data={}
    data.list=list
    res.send(data)
}
function sqlfun(type_id){
    return new Promise(async (resolve, reject) => {
        let list = await Shop.findAll({
            where:{
                type_id:type_id
            }
        })
        // console.log('list')
        resolve(list)
    });
}
module.exports=list