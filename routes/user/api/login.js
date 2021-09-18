var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect() 
function login(req, res, next) {
    let { name,password } = req.query;
    let thesql = "select * from user_table where name = ?" 
    // let thesql = "updata " 
    $sql.query(thesql,[name],function (err, result) {
        if (err) {
            console.log('查询数据库失败');
        } else {
            console.log(result[0]);
            let data;
            if (result.length) {
                if(result[0].password==password){
                    data = {
                        code: 200,
                        msg: "登录成功"
                    }
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
module.exports=login