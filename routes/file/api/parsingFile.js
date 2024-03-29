var $mysql   = require("mysql");
const multiparty = require('multiparty')
const fs = require('fs')
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect() 
var xlsx = require('node-xlsx');
/**,
 * @swagger
 * /file/parsingFile:
 *    post:
 *      tags:
 *      - file    #接口分类
 *      summary: "解析excel表格文件"   #接口备注
 *      description: "上传文件"   #接口描述
 *      consumes:
 *      - "multipart/form-data"
 *      produces:
 *      - "application/json"
 *      parameters:
 *      - name: "file"
 *        in: "formData"
 *        description: ""
 *        required: true
 *        type: "file"
 * */

// 解析excel文件数据，将数据插入data_table表格里
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
      // 同步重命名文件名 fs.renameSync(oldPath, newPath)
　　　 //oldPath  不得作更改，使用默认上传路径就好
      fs.renameSync(inputFile.path, newPath);
      insertFile(id,files.file[0].originalFilename,newPath,res)
    } catch (err) {
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
                var obj = xlsx.parse(`E:/hjc/image/${id}.xlsx`);//配置excel文件的路径
                var excelObj=obj[0].data;
                for(let i=1;i<excelObj.length;i++){
                    let id='shop_'+new Date().getTime()+Math.floor(Math.random() * 10000)
                    let time=new Date().getFullYear()+'-'+new Date().getMonth()+'-'+new Date().getDate()+' '+new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds()
                    let thesql = "insert into data_table(shop_id,shop_name,shop_price,add_time) values(?,?,?,?)"
                    $sql.query(thesql,[id,excelObj[i][0],excelObj[i][1],time],function (err, result){
                        console.log(err)
                    }) 
                }
                data = {
                    code: 100,
                    msg: "上传数据成功"
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
