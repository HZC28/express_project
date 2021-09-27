var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect() 
// 新增：insert into 表名(字段,字段) values(值,值)
// 删除：delete from 表名 where 条件
// 修改：update 表名 set 字段=值 where 条件
// 查询：select 字段,字段/* from 表名 (where 条件)
function cancellation(req, res, next) {
    let { name,password } = req.query;
    let thesql = "select * from user_table where name = ?" 
    $sql.query(thesql,[name],async function (err, result) {
        if (err) {
            console.log('查询数据库失败');
        } else {
            if (result.length) {
                if(result[0].password==password){
                    // data = {
                    //     code: 200,
                    //     msg: "登录成功"
                    // }
                    let obj=await deleteUser(name)
                    if(obj.affectedRows!=0){
                        data={
                            code:200,
                            msg:"注销成功"
                        }
                    }
                    console.log(123)
                }else{
                    data = {
                        code: 100,
                        list: "账号名或者密码有误"
                    }
                }
                
            } else {
                data = {
                    code: 100,
                    msg: '对不起，您输入的账号未注册'
                }
            }
            res.send(data)
        }
    })
}
async function deleteUser(name){
    let thesql = "delete from user_table where name = ?" 
    return new Promise((resolove,reject) => {
        $sql.query(thesql,[name],function (err, result) {
            resolove(result)
        })
    })
    
}
module.exports=cancellation