var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect() 
// 新增：insert into 表名(字段,字段) values(值,值)
// 删除：delete from 表名 where 条件
// 修改：update 表名 set 字段=值 where 条件
// 查询：select 字段,字段/* from 表名 (where 条件)

function changeUserInfo(req, res, next) {
    // let params=req.body
    // let arr=Object.keys(params)
    // // console.log(Object.keys(params))
    // // console.log(params[arr[0]])
    // res.send(req.body)
    // let str=''
    // arr.forEach((val,index)=>{
    //     str+=val+"= ? "
    // })
    // console.log(str)
    let { name,password } = req.query;
    let thesql = "update user_table set password=? where name = ?" 
    $sql.query(thesql,[password,name],function (err, result) {
        if (err) {
            console.log('查询数据库失败');
        } else {
            console.log(result);
            let data;
            if (result.affectedRows!=0) {
                data = {
                    code: 200,
                    msg: "修改成功"
                }
            } else {
                data = {
                    code: 100,
                    msg: "操作失败"
                }
            }
            res.send(data)
        }
    })
}
module.exports=changeUserInfo