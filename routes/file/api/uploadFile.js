var $mysql = require("mysql");
const multiparty = require('multiparty')
const fs = require('fs')
var sql = require("../../../public/sql/mysql.js"); //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql) //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect()
let jwt = require("jsonwebtoken")
/**,
 * @swagger
 * /file/uploadFile:
 *    post:
 *      tags:
 *      - file    #接口分类
 *      summary: "上传文件"   #接口备注
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
// 文件上传方法
let user = ''

function uploadFile(req, res, next) {
    let token = req.headers.token;
    jwt.verify(token, "abc", function (err, decoded) {
        if (!err) {
            user = decoded.username
        }
    })
    /* 生成multiparty对象，并配置上传目标路径 */
    let form = new multiparty.Form();
    // 设置编码
    form.encoding = 'utf-8';
    // 设置文件存储路径，以当前编辑的文件为相对路径
    form.uploadDir = 'E:/hjc/image';
    // 设置文件大小限制
    form.maxFilesSize = 10 * 1024 * 1024;
    let id = new Date().getTime() + Math.floor(Math.random() * 10000) + ''
    form.parse(req, async function (err, fields, files) {
        // console.log(files)
        if(!files.file){
            res.send({
                code: 100,
                msg: "没有上传文件,请检查参数"
            });
            return
        }
        // type为0或者不传时是单文件上传,type为1时是多文件上传
        let type=(fields.type&&fields.type!='')?parseInt(fields.type[0]):0
        if (files.file.length > 1&&type==0) {
            res.send({
                code: 100,
                msg: "只能上传单文件"
            });
            return
        }
        // console.log(files.file)
        if (files.file.length > 3&&type==1) {
            res.send({
                code: 100,
                msg: "上传文件不能超过3个"
            });
            files.file.forEach(val=>{
                console.log(val.path)
                fs.unlink(val.path,function(){})  
            })
            return
        }
        let paths=[]
        for(let k=0;k<files.file.length;k++){
            let size = files.file[k].size / 1024 / 1024
            let fileName = files.file[k].originalFilename
            let path = files.file[k].path
            paths.push(path)
            let type = /\.[^\.]+$/.exec(fileName)
            if (size > 2) {
                // console.log(paths,"paths")
                paths.forEach(val=>{
                    // console.log(val)
                    fs.unlink(val,function(){})  
                })
                res.send({
                    code: 100,
                    msg: `上传文件不能超过2M,${files.file[k].originalFilename}`
                });
                // fs.unlink(path,function(){})
                return
            }
            // console.log(type)
            if(type!=".png"&&type!=".jpg"&&type!=".gif"){
                paths.forEach(val=>{
                    fs.unlink(val,function(){})  
                })
                res.send({
                    code: 100,
                    msg: `上传文件类型只能是gif,jpg,png格式,${files.file[k].originalFilename}`
                });
                return
            }
        }
        console.log("try")
        try {
            // 上传单一文件
            // let inputFile = files.file[0];
            // let fileName = inputFile.originalFilename
            // let type = /\.[^\.]+$/.exec(fileName)
            // let newPath = form.uploadDir + "/" + id + type
            // 同步重命名文件名 fs.renameSync(oldPath, newPath)
            // oldPath  不得作更改，使用默认上传路径就好
            // fs.renameSync(inputFile.path, newPath);
            // insertFile(id, files.file[0].originalFilename, newPath, res)

            // 上传多个文件
            insertFiles(form, files.file, res)
        } catch (err) {
            res.send({
                code: 100,
                msg: "上传失败"
            });
        };
    })
}
// 单文件上传
function insertFile(id, name, address, res) {
    let thesql = "insert into file_table(file_id,file_name,file_address,user) values(?,?,?,?)"
    $sql.query(thesql, [id, name, address, user], function (err, result) {
        if (err) {
            res.send({
                code: 100,
                msg: "上传失败"
            })
        } else {
            console.log(result);
            let data;
            if (result.affectedRows != 0) {
                data = {
                    code: 200,
                    msg: "上传成功",
                    data: {
                        file_id: id,
                        file_name: name
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
// 多文件上传
async function insertFiles(form, files, res) {
    let data = {
        code: 200,
        msg: "上传成功",
        data: {
            file_id: [],
            file_name: []
        }
    }
    // 循环遍历文件插入数据库并保存本地
    for (let i = 0; i < files.length; i++) {
        let id = new Date().getTime() + Math.floor(Math.random() * 10000) + i + 1 + ''
        let inputFile = files[i];
        let fileName = files[i].originalFilename
        let type = /\.[^\.]+$/.exec(fileName)
        let newPath = form.uploadDir + "/" + id + type
        // 同步重命名文件名 fs.renameSync(oldPath, newPath)
        //oldPath  不得作更改，使用默认上传路径就好
        fs.renameSync(inputFile.path, newPath);
        let thesql = "insert into file_table(file_id,file_name,file_address,user) values(?,?,?,?)"
        let a = await sqlfun(thesql, id, fileName, newPath, user)
        if (a == 200) {
            data.data.file_name.push(fileName)
            data.data.file_id.push(id)
        } else {
            data = {
                code: 100,
                msg: "上传失败"
            }
            return
        }
    }
    res.send(data)
}
// sql语句异步变同步
function sqlfun(thesql, id, fileName, newPath, user) {
    return new Promise((resolve, reject) => {
        $sql.query(thesql, [id, fileName, newPath, user], (err, result) => {
            if (err) {
                resolve("100")
            } else {
                resolve("200")
            }
        })
    });
}
module.exports = uploadFile