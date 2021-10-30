// 获取JSSDK签名

var $mysql = require("mysql");
var sql = require("../../../public/sql/mysql.js"); //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql) //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect()
const AlipayFormData = require("alipay-sdk/lib/form").default;
const crypto = require('crypto');
var request = require('request');
let Order=require("../../../public/Model/order.js")
const sequelize=require("../../../public/sequelize/index")
const  alipaySdk=require("../../../public/alipayUtil.js")
// 支付宝调用h5支付
// https://openapi.alipay.com/gateway.do?timestamp=2013-01-01 08:08:08&method=alipay.trade.query&app_id=24241&sign_type=RSA2&sign=ERITJKEIJKJHKKKKKKKHJEREEEEEEEEEEE&version=1.0&charset=GBK&biz_content=AlipayTradeQueryModel
async function query(orderno) {
    const formData = new AlipayFormData();
    formData.setMethod('get');
    formData.addField('bizContent', {
        out_trade_no: orderno, // 商户订单号,64个字符以内、可包含字母、数字、下划线,且不能重复
    });
    // formData.addField('returnUrl', 'https://opendocs.alipay.com');//加在这里才有效果,不是加在bizContent 里面
    const result =await alipaySdk.exec(  // result 为可以跳转到支付链接的 url
        'alipay.trade.query', // 统一收单下单并支付页面接口
        {}, // api 请求的参数（包含“公共请求参数”和“业务参数”）
        { formData: formData }
    );
    request(result,async function(error, response, body){
        let obj=JSON.parse(response.body)
        if(obj.alipay_trade_query_response.code=="10000"){
            let x = await Order.update({
                order_buyer_logon_id:obj.alipay_trade_query_response.buyer_logon_id,
                order_buyer_user_id:obj.alipay_trade_query_response.buyer_user_id,
                order_state_msg:"支付成功",
                order_state:"200"
            },{
                where:{
                    order_no:orderno
                }
            })
        }else{
            let x = await Order.update({
                order_buyer_logon_id:obj.alipay_trade_query_response.buyer_logon_id,
                order_buyer_user_id:obj.alipay_trade_query_response.buyer_user_id,
                order_state_msg:"支付失败",
                order_state:"100"
            },{
                where:{
                    order_no:orderno
                }
            }) 
        }
        
    })

}
module.exports = query