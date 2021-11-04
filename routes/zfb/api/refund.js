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
let Refund=require("../../../public/Model/refund.js")
let Order=require("../../../public/Model/order.js")
// 支付宝退款接口
// https://openapi.alipay.com/gateway.do?timestamp=2013-01-01 08:08:08&method=alipay.trade.query&app_id=24241&sign_type=RSA2&sign=ERITJKEIJKJHKKKKKKKHJEREEEEEEEEEEE&version=1.0&charset=GBK&biz_content=AlipayTradeQueryModel
async function query_h5(req, res, next) {
    let orderno=req.body.orderno
    let amount=req.body.amount
    let refund_no= getout_request_no()
    console.log(orderno)
    const formData = new AlipayFormData();
    formData.setMethod('get');
    formData.addField('bizContent', {
        out_trade_no: orderno, // 商户订单号,64个字符以内、可包含字母、数字、下划线,且不能重复
        refund_amount:amount,
        out_request_no:refund_no
    });
    // formData.addField('returnUrl', 'https://opendocs.alipay.com');//加在这里才有效果,不是加在bizContent 里面
    const result =await  alipaySdk.exec(  // result 为可以跳转到支付链接的 url
        'alipay.trade.refund', // 统一收单下单并支付页面接口
        {}, // api 请求的参数（包含“公共请求参数”和“业务参数”）
        { formData: formData }
    );
    request(result,async function(error, response, body){
        let obj=JSON.parse(response.body).alipay_trade_refund_response
        if(obj.code=="10000"){
            let params={
                refund_no: refund_no,
                buyer_logon_id:obj.buyer_logon_id,
                buyer_user_id:obj.buyer_user_id,
                order_no: orderno,
                refund_noney: amount
            }
            await sequelize.sync();
            let x = await Refund.create(params)
            console.log(x)
            let y=await Order.update({
                // refund_total:sequelize.literal(`refund_total+${amount}`),
                refund_total:obj.refund_fee
            },
            {
                where:{
                    order_no: orderno
                }
            }
            )
            // console.log(y)
        }
        res.send(obj)
    })

}
function getout_request_no(){
    let first=""+new Date().getFullYear()  + (new Date().getMonth()+1)  + new Date().getDate()+ new Date().getHours()  + new Date().getMinutes()  + new Date().getSeconds()+""
    let third=parseInt(Math.random()*100)
    let id=first+third
    console.log(third)
    return id
}
module.exports = query_h5