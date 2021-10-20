var $mysql = require("mysql");
let jwt = require("jsonwebtoken")
const request = require('request');
const querystring = require('querystring')
const Token = require("./../../public/Model/token.js")
const schedule = require('node-schedule');
let time=0
const  scheduleCronstyle = ()=>{
  //每分钟的第30秒定时执行一次:
    schedule.scheduleJob('*/5 * * * * *',()=>{
        console.log(time++)
        c()
    }); 
}
// scheduleCronstyle();

async function c() {
    let arr = []
    let successArr = []
    for (let i = 0; i < 100; i++) {
        let info = await getObj()
        console.log(info,i)
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
    return
}
// https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
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