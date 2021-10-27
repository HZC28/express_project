// 获取JSSDK签名

var $mysql = require("mysql");
var sql = require("../../../public/sql/mysql.js"); //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql) //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect()
const crypto = require('crypto');
var request = require('request');
let APPID = 'wx3fdda51ff31c80b8'
let secret = '140d7dca74627817725872e9b6eb366f'

// 微信分享

// 50_OskH-iFb1JhD_iOLBx12cdfp2b5o7S7zskLOLn-JDStVRE4jvvY__Uj75X_OY5HYQb-yHFXwkSvKJQKKT0Bc4Eqq8SDPqwtBbClae7EaUVRSxtJG6lrlMXMMctyrjapt3-WxFypF-G3jYnklGZEjACAJCH
async function getUser(req, res, next) {
    let jsapi_ticket=JSON.parse(await getjsapi_ticket()).ticket
    console.log(jsapi_ticket)
    let ret = {
        jsapi_ticket: jsapi_ticket,
        // 随机字符串
        nonceStr: createNonceStr(),
        // 时间戳
        timestamp: createTimestamp(),
        url: "https://www.nandao.tech/book?code=011vV3100MfbDM1PGd100fJ3mZ0vV31A&state=STATE"
    };
    var string = raw(ret)
    ret.signature = sha1(string)
    ret.appId = APPID;
    res.send(ret);
}
module.exports = getUser
// 获取access_token
function getToken() {
    return new Promise(function (resolve, reject) {
        request(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${secret}`, function (error, response, body) {
            resolve(JSON.parse(JSON.stringify(response.body)))
        })
    })
}

// 用第一步拿到的access_token 采用http GET方式请求获得jsapi_ticket
async function getjsapi_ticket() {
    let token =JSON.parse(await getToken()).access_token
    return new Promise(function (resolve, reject) {
        request(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`, function (error, response, body) {
            resolve(response.body)
        })
    })
}


// sha1加密
function sha1(str) {
    let shasum = crypto.createHash("sha1")
    shasum.update(str)
    str = shasum.digest("hex")
    return str
}

/**
 * 生成签名的时间戳
 */
function createTimestamp() {
    return parseInt(new Date().getTime() / 1000) + ''
}

/**
 * 生成签名的随机串
 */
function createNonceStr() {
    return Math.random().toString(36).substr(2, 15)
}

/**
 * 对参数对象进行字典排序
 */
function raw(args) {
    var keys = Object.keys(args)
    keys = keys.sort()
    var newArgs = {}
    keys.forEach(function (key) {
        newArgs[key.toLowerCase()] = args[key]
    })

    var string = ''
    for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k]
    }
    string = string.substr(1)
    return string
}