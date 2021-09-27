var $mysql   = require("mysql");
const multiparty = require('multiparty')
const fs = require('fs')
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect() 
function uploadFile(req, res, next) {
   /* 生成multiparty对象，并配置上传目标路径 */
  let form = new multiparty.Form();
  // 设置编码
  form.encoding = 'utf-8';
  // 设置文件存储路径，以当前编辑的文件为相对路径
  form.uploadDir = 'E:/hjc/image';
  // 设置文件大小限制
  form.maxFilesSize = 10 * 1024 * 1024;
  let id=new Date().getTime()+Math.floor(Math.random() * 10000)+''
  form.parse(req, function (err, fields, files) {
    // {
    //     fieldName: 'file',
    //     originalFilename: 'QQ浏览器截图20210424185032.png',
    //     path: 'E:\\hjc\\image\\DhV0vpuRTNbEXsuPu_5zvv2m.png',
    //     headers: [Object],
    //     size: 1444955
    //   }
    try {
      let inputFile = files.file[0];
      let fileName=inputFile.originalFilename
      let type=/\.[^\.]+$/.exec(fileName)
      let newPath = form.uploadDir + "/" + id+type
      console.log(type)
      // 同步重命名文件名 fs.renameSync(oldPath, newPath)
　　　 //oldPath  不得作更改，使用默认上传路径就好
      fs.renameSync(inputFile.path, newPath);
      insertFile(id,files.file[0].originalFilename,newPath,res)
    } catch (err) {
      console.log(err);
      res.send({
        code: 100,
        msg: "上传失败"
      });
    };
  })
}
function insertFile(id,name,address,res){
    let thesql = "insert into file_table(file_id,file_name,file_address) values(?,?,?)" 
    $sql.query(thesql,[id,name,address],function (err, result) {
        if (err) {
            console.log(err);
            res.send({
                code: 100,
                msg: "上传失败"
            })
        } else {
            console.log(result);
            let data;
            if (result.affectedRows!=0) {
                data = {
                    code: 200,
                    msg: "上传成功",
                    data:{
                        file_id:id,
                        file_name:name
                    }
                }
            } else {
                data = {
                    code: 100,
                    msg: "上传失败"
                }
            }
            res.send(data)
        }
    })
}
module.exports=uploadFile
