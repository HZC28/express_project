// 获取JSSDK签名

var $mysql = require("mysql");
var sql = require("../../../public/sql/mysql.js"); //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql) //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect()
const crypto = require('crypto');
var request = require('request');
let {token_fun,ticket_fun}=require("../../../public/util/token.js")
let APPID = 'wxb55302fba51c9a26'
let secret = '51c44e249ff524a9a45e6d4cc8ae1510'
// 微信分享
async function getUser(req, res, next) {
    let jsapi_ticket=await ticket_fun()
    // console.log(jsapi_ticket)
    let ret = {
        jsapi_ticket: jsapi_ticket,
        // 随机字符串
        nonceStr: createNonceStr(),
        // 时间戳
        timestamp: createTimestamp(),
        url: "http://ftp6487794.host117.sanfengyun.cn/wx/index"
    };
    var string = raw(ret)
    ret.signature = sha1(string)
    ret.appId = APPID;
    ret.token = token;
    // console.log(ret)
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
    token =JSON.parse(await getToken()).access_token
    console.log(token)
    return new Promise(function (resolve, reject) {
        request(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`, function (error, response, body) {
            // console.log(response.body)
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