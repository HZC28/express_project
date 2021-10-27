// 获取JSSDK签名

var $mysql = require("mysql");
var sql = require("../../../public/sql/mysql.js"); //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql) //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect()
const AlipayFormData = require("alipay-sdk/lib/form").default;

const crypto = require('crypto');
var request = require('request');
const  alipaySdk=require("../../../public/alipayUtil.js")
let APPID = '2021000118638070'
// 50_OskH-iFb1JhD_iOLBx12cdfp2b5o7S7zskLOLn-JDStVRE4jvvY__Uj75X_OY5HYQb-yHFXwkSvKJQKKT0Bc4Eqq8SDPqwtBbClae7EaUVRSxtJG6lrlMXMMctyrjapt3-WxFypF-G3jYnklGZEjACAJCH
async function trade(req, res, next) {
    const formData = new AlipayFormData();
    formData.setMethod('get');
    formData.addField('bizContent', {
        outTradeNo: getoutTradeNo(), // 商户订单号,64个字符以内、可包含字母、数字、下划线,且不能重复
        totalAmount: '0.01', // 订单总金额，单位为元，精确到小数点后两位
        subject: '商品', // 订单标题
        body: '商品详情', // 订单描述
        product_code:"FAST_INSTANT_TRADE_PAY"
    });
    // formData.addField('returnUrl', 'https://opendocs.alipay.com');//加在这里才有效果,不是加在bizContent 里面
    const result =await  alipaySdk.exec(  // result 为可以跳转到支付链接的 url
        'alipay.trade.page.pay', // 统一收单下单并支付页面接口
        {}, // api 请求的参数（包含“公共请求参数”和“业务参数”）
        { formData: formData }
    );
    res.send(result)
}
function getoutTradeNo(){
    let first=""+new Date().getFullYear()  + (new Date().getMonth()+1)  + new Date().getDate()+ new Date().getHours()  + new Date().getMinutes()  + new Date().getSeconds()+""
    let secord=new Date().getTime()
    let third=parseInt(Math.random()*10000000)
    let id=first+secord+third
    console.log(third)
    return id
}
module.exports = trade
