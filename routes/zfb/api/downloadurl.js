// 获取JSSDK签名

var $mysql = require("mysql");
var sql = require("../../../public/sql/mysql.js"); //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql) //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect()
const AlipayFormData = require("alipay-sdk/lib/form").default;

const crypto = require('crypto');
var request = require('request');
const  alipaySdk=require("../../../public/alipayUtil.js")
// 获取支付二维码
async function trade(req, res, next) {
    test(res)
}
module.exports = trade

async function test(res){
    const formData = new AlipayFormData();
    formData.setMethod('get');
    formData.addField('bizContent', {
        bill_type:"signcustomer",
        bill_date:"2021-09-05"
    });
    // formData.addField('returnUrl', 'https://opendocs.alipay.com');//加在这里才有效果,不是加在bizContent 里面
    const result =await  alipaySdk.exec(  // result 为可以跳转到支付链接的 url
        'alipay.data.dataservice.bill.downloadurl.query', // 统一收单下单并支付页面接口
        {}, // api 请求的参数（包含“公共请求参数”和“业务参数”）
        { formData: formData }
    );
    // res.send(result)
    console.log(result)
    request(result,function(error, response, body){
        let obj=JSON.parse(response.body)
        res.send(obj)
        // res.send(obj.alipay_data_dataservice_bill_downloadurl_query_response.bill_download_url)
    })
}