// 获取JSSDK签名

var $mysql = require("mysql");
var sql = require("../../../public/sql/mysql.js"); //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql) //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect()
const AlipayFormData = require("alipay-sdk/lib/form").default;
const sequelize=require("../../../public/sequelize/index")
const crypto = require('crypto');
var request = require('request');
const  alipaySdk=require("../../../public/alipayUtil.js")
let Order=require("../../../public/Model/order.js")
// pc端跳转支付宝支付页面
async function trade(req, res, next) {
    const formData = new AlipayFormData();
    let orderno=getoutTradeNo()
    let order_name='商品'
    let order_price="1"
    let order_detail="商品描述"
    formData.setMethod('get');
    formData.addField('bizContent', {
        outTradeNo: orderno, // 商户订单号,64个字符以内、可包含字母、数字、下划线,且不能重复
        totalAmount: order_price, // 订单总金额，单位为元，精确到小数点后两位
        subject: order_name, // 订单标题
        body: order_detail, // 订单描述
        product_code:"FAST_INSTANT_TRADE_PAY"
    });
    formData.addField('notify_url', "http://nandao.free.idcfengye.com/zfb/return_url");
    formData.addField('return_url', "https://ftp6487794.host117.sanfengyun.cn/#wx/index");
    // formData.addField('returnUrl', 'https://opendocs.alipay.com');//加在这里才有效果,不是加在bizContent 里面
    const result =await  alipaySdk.exec(  // result 为可以跳转到支付链接的 url
        'alipay.trade.page.pay', // 统一收单下单并支付页面接口
        {}, // api 请求的参数（包含“公共请求参数”和“业务参数”）
        { formData: formData }
    );
    await sequelize.sync();
    let order_obj={
        order_no:orderno,
        order_name: order_name,
        order_pay_type:"pc",
        order_price: order_price,
        order_state: 0,
        order_state_msg: "跳转支付",
        order_detail: order_detail
    }
    let x = await Order.create(order_obj)
    console.log(orderno)
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


