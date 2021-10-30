var request = require('request');
let APPID = 'wxb55302fba51c9a26'
let secret = '51c44e249ff524a9a45e6d4cc8ae1510'

let access_token=""
let token_time="1635320769811"
let jsapi_ticket=""
let ticket_time="1635320769811"

async function token_fun(){
    let require_time=new Date().getTime()
    let daly_time=(parseInt(require_time)-parseInt(token_time))/1000
    // console.log("间隔时间",daly_time)
    if(access_token==""||daly_time>7000){
        token =JSON.parse(await getToken()).access_token
        token_time=new Date().getTime()
        // console.log(JSON.parse(await getToken()))
        // console.log(token)
        return token
    }
    return token
}
async function ticket_fun(){
    // console.log("ticket_fun")
    let require_time=new Date().getTime()
    let daly_time=(parseInt(require_time)-parseInt(ticket_time))/1000
    // console.log("间隔时间",daly_time)
    if(jsapi_ticket==""||daly_time>7000){
        jsapi_ticket =JSON.parse(await getjsapi_ticket()).ticket
        ticket_time=new Date().getTime()
        return jsapi_ticket
    }
    return jsapi_ticket
}

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
    if(access_token==""||daly_time>7000){
        token =JSON.parse(await getToken()).access_token
        token_time=new Date().getTime()
    }
    // console.log(8)
    return new Promise(function (resolve, reject) {
        request(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${token}&type=jsapi`, function (error, response, body) {
            // console.log(JSON.parse(JSON.stringify(response.body)))
            resolve(JSON.parse(JSON.stringify(response.body)))
        })
    })
}
module.exports={
    token_fun,
    ticket_fun
}
