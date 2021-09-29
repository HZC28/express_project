var $mysql = require("mysql");
let fs=require('fs')
var sql = require("../../../public/sql/mysql.js"); //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql) //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect()
function loadFile(req, res, next) {
    let {
        fileId
    } = req.query;
    let thesql = "select * from file_table where file_id = ?"
    $sql.query(thesql, [fileId], function (err, result) {
        if (err) {
            console.log('查询数据库失败');
        } else {
            let data;
            if (result.length) {
                let path = result[0].file_address
                fs.readFile(path, function (err, data) {
                    if (err) throw err
                    console.log('isBuffer: ' + Buffer.isBuffer(data)) // isBuffer: true
                    console.log(data) // <Buffer 72 6f ... >
                    res.send(data)
                  })
                  
                // data = {
                //     code: 200,
                //     data: result[0]
                // }
            } else {
                res.send({
                    code: 100,
                    msg: '对不起，找不到文件'
                })
            }
            
        }
    })
}
module.exports = loadFile