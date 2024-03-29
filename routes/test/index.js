var express = require('express');
var router = express.Router();
var $mysql   = require("mysql");
var sql = require("../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect()                          //运用了这句才是真正连接
let a=require('./api/a.js')
let b=require("./api/b")
let getData=require("./api/getData")
let qrcode=require("./api/qrcode")
let jwt = require("jsonwebtoken")
let query=require("./api/query.js")
let c=require("./api/c.js")
let changeData=require("./api/changeData.js")
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
router.get('/test/query', function(req, res, next) {
    query(req, res, next)
});
router.get('/test/c', function(req, res, next) {
    c(req, res, next)
});
router.post('/test/changeData', function(req, res, next) {
    changeData(req, res, next)
});


router.get('/test/c', function(req, res, next) {
    let token = req.headers.token;
    jwt.verify(token, "abc", function (err, decoded) {
        if(decoded.role==1){
            res.send({
                code:100,
                msg:"没有权限"
            })
            return
        }
         res.send({
            code:200,
            decoded:decoded,
            msg:"成功调用"
        })
    })
});
router.get("/test/getData",function(req,res,next){
    getData(req,res,next)
})
module.exports = router;