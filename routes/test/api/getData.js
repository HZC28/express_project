var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
let jwt = require("jsonwebtoken")
const sequelize=require("../../../public/sequelize/index")
const WebSite=require("../../../public/Model/user.js")
const request=require("request")
let Articles=require("../../../public/Model/articles.js")
$sql.connect()

async function getData(req, res, next) {
    request({
        url:"https://blog.csdn.net/api/articles?type=more&category=home&shown_offset=0",
        params:{
            type:"more",
            category:"home",
            shown_offset:0
        },
        method:"get"
    },function(error, response, body){
        let articles=JSON.parse(body).articles
        for(let i=0;i<articles.length;i++){
            sqlfun(articles[i])
        }
        res.send(articles)
    })
}
async function sqlfun(item){
    // await sequelize.sync();
    Articles.create({
        comments: item.comments,
        avatarurl:item.avatarurl,
        title:item.title,
        desc:item.desc,
        user_url:item.user_url,
        avatar:item.avatar,
        url:item.url
    })
}
module.exports=getData