var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect() 
var request = require('request');
let code="001fVK0w3olv7X2XTZ2w3lkcLm0fVK0N"
let APPID='wx3fdda51ff31c80b8'
let secret='140d7dca74627817725872e9b6eb366f'

// 短链接重定向到授权url

// 50_OskH-iFb1JhD_iOLBx12cdfp2b5o7S7zskLOLn-JDStVRE4jvvY__Uj75X_OY5HYQb-yHFXwkSvKJQKKT0Bc4Eqq8SDPqwtBbClae7EaUVRSxtJG6lrlMXMMctyrjapt3-WxFypF-G3jYnklGZEjACAJCH
async function redirect(req, res, next) {
    const redirectURL = "https://www.nandao.tech/book";
    const appId = "wxb55302fba51c9a26";
    const url =
      "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
      appId +
      "&redirect_uri=" +
      encodeURIComponent(redirectURL) +
      "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
      res.redirect(url);
}
module.exports=redirect