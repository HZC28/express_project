var $mysql = require("mysql");
var sql = require("../../../public/sql/mysql.js"); //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql) //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
let jwt = require("jsonwebtoken")
const sequelize = require("../../../public/sequelize/index")
const WebSite = require("../../../public/Model/user.js")
const request = require('request');
const querystring = require('querystring')
const Token = require("../../../public/Model/token.js")
$sql.connect()
async function c(req, res, next) {
    let url;
    let arr = []
    let successArr = []
    for (let i = 1000; i < 10; i++) {
        let info = await getObj()
        console.log(info,req.query.key,i)
        // await sequelize.sync();
        arr.push(info)
        if (info.code != 100) {
            Token.create({
                code: info.code,
                msg: info.msg,
                token: info.token
            })
            successArr.push(info)
        }
    }
    res.send(successArr)
}

function getObj() {
    let params = {
        token: getTokenfun(),
        url: "https://v.douyin.com/djRLY4M/"
    }
    let options = {
        url: "https://v2.alapi.cn/api/video/url",
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
        body: querystring.stringify(params)
    }
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            let obj = {}
            // console.log(response)
            obj.code = response.body.code
            obj.msg = response.body.msg
            obj.token = params.token
            resolve(obj)
        })
    })
}

function getTokenfun() {
    let num;
    let token = ''
    for (let i = 0; i < 16; i++) {
        num = Math.floor(Math.random() * 62)
        token += getCharacter(num)
    }
    return token
}
/** 
 * 返回一个随机的小写字母 
 */
function getLowerCharacter() {
    return getCharacter("lower");;
}
/** 
 * 返回一个随机的大写字母 
 */
function getUpperCharacter() {
    return getCharacter("upper");;
}
/** 
 * 返回一个字母 
 */
function getCharacter(flag) {
    var character = "";
    if (flag <= 9) {
        character = Math.floor(Math.random() * 10);
    }
    if (flag > 9 && flag <= 35) {
        character = String.fromCharCode(Math.floor(Math.random() * 26) + "a".charCodeAt(0));
    }
    if (flag >= 35) {
        character = String.fromCharCode(Math.floor(Math.random() * 26) + "A".charCodeAt(0));
    }
    return character;
}


module.exports = c



