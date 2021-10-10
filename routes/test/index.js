var express = require('express');
var router = express.Router();
var $mysql   = require("mysql");
var sql = require("../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect()                          //运用了这句才是真正连接
let a=require('./api/a.js')
let b=require("./api/b")
let qrcode=require("./api/qrcode")
let jwt = require("jsonwebtoken")
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log(req)
  res.send("213213")
});

// 登录方法
router.get('/test/a', function(req, res, next) {
    a(req, res, next)
});
router.post('/test/b', function(req, res, next) {
    b(req, res, next)
});

router.get('/test/create_qrcode', function(req, res, next) {
    qrcode(req, res, next)
});


router.get('/test/c', function(req, res, next) {
    let token = req.headers.token;
    jwt.verify(token, "abc", function (err, decoded) {
        if (!err){
              console.log(decoded);  //会输出123，如果过了60秒，则有错误。
              if(decoded.role==3){
                  res.send({
                      code:100,
                      msg:"没有权限"
                  })
                  return
              }
         }
         res.send({
            code:200,
            decoded:decoded,
            msg:"成功调用"
        })
    })
});
module.exports = router;