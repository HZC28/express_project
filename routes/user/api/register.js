var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect() 
// 新增：insert into 表名(字段,字段) values(值,值)
// 删除：delete from 表名 where 条件
// 修改：update 表名 set 字段=值 where 条件
// 查询：select 字段,字段/* from 表名 (where 条件)
function registered(req, res, next) {
    let { name,password } = req.query;
    let thesql = "insert into user_table(name,password) values(?,?)" 
    $sql.query(thesql,[name,password],function (err, result) {
        if (err) {
            console.log(err);
            res.send({
                code: 100,
                msg: "该账号已注册过"
            })
        } else {
            console.log(result);
            let data;
            if (result.affectedRows!=0) {
                data = {
                    code: 200,
                    msg: "注册成功"
                }
            } else {
                data = {
                    code: 100,
                    msg: "注册失败"
                }
            }
            res.send(data)
        }
    })
}
module.exports=registered