var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect() 
let rawBody=require("raw-body")
var request = require('request');
let xml2js=require("xml2js")
// 公众号测试账号appid，sercket
let code="001fVK0w3olv7X2XTZ2w3lkcLm0fVK0N"
let APPID='wxb55302fba51c9a26'
let secret='51c44e249ff524a9a45e6d4cc8ae1510'

// 自动回复信息

// 50_OskH-iFb1JhD_iOLBx12cdfp2b5o7S7zskLOLn-JDStVRE4jvvY__Uj75X_OY5HYQb-yHFXwkSvKJQKKT0Bc4Eqq8SDPqwtBbClae7EaUVRSxtJG6lrlMXMMctyrjapt3-WxFypF-G3jYnklGZEjACAJCH
async function getmsg(req, res, next) {
    var buffer = [];
    req.on('data', function (data) {
      buffer.push(data);
    });
 
    req.on('end', async function () {
      try {
        const r = await msgHandler(buffer);
        console.log('send Data:', r);
        res.send(r);
      } catch (error) {
        console.log('公众号消息事件Error:', error);
        res.send('error');
      }
    });
    let obj = GetRequest(req.url);
    let signature=obj['signature']
    let echostr=obj['echostr']
    let timestamp=obj['timestamp']
    let nonce=obj['nonce']
    // res.send(echostr)
}
function GetRequest(url) {
    // var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    let k=url.indexOf("?");
    var str = url.substr(k+1);
    console.log(str)
    strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
    return theRequest;
}
function msgHandler(msgbufer) {
    var parser = new xml2js.Parser({ trim: true, explicitArray: false, explicitRoot: false });
    var builder = new xml2js.Builder({ headless: true, cdata: true, explicitRoot: false, rootName: 'xml' });
    return new Promise((resolve, reject) => {
      parser.parseString(msgbufer.toString(), async function (err, result) {
        if (err) {
          reject({
            code: -1,
            msg: 'error',
            data: err,
          });
        }
        console.log(result)
        var baseData = {
          ToUserName: result.FromUserName,
          FromUserName: result.ToUserName,
          CreateTime: Date.now(),
        }
 
        switch (result.MsgType) {
          case 'text':
            switch (result.Content.toLowerCase()) {
              case 'help':
                // 返回帮助内容
                var helpTxt = [
                  '1. 在公众号对话框中输入任意商品名称，点击返回的链接即可筛选购买.',
                  '2. 输入关键字『入口』可以得到网站的入口链接.'
                ]
                var data = Object.assign({
                  MsgType: 'text',
                  Content: helpTxt.join('\n'),
                }, baseData);
 
                resolve(builder.buildObject(data));
                break;
                case '1':
                // 返回帮助内容
                var str ="111，就知道输入1"
                var data = Object.assign({
                  MsgType: 'text',
                  Content: str,
                }, baseData);
 
                resolve(builder.buildObject(data));
                break;
              default:
                break;
            }
            break;
          case 'event':
            if (result.Event === 'subscribe') {
              // 关注
              var data = Object.assign({
                MsgType: 'news',
                ArticleCount: 1,
                Articles: {
                  item: {
                    Title: '淘淘乐',
                    Description: '丸子带你买，店内领取各种淘宝天猫优惠券',
                    PicUrl: 'http://weixin.tangsj.com/dataoke/wx.jpg',
                    Url: 'http://weixin.tangsj.com/dataoke/',
                  },
                },
              }, baseData);
 
              resolve(builder.buildObject(data));
            } else if (result.Event === 'unsubscribe') {
              // 取消关注
              var data = Object.assign({
                MsgType: 'text',
                Content: '在下没能满足客官的需求，实在抱歉~~',
              }, baseData);
 
              resolve(builder.buildObject(data));
            }else if(result.Event === 'CLICK'){
                switch (result.EventKey){
                    case 'V1001_GOO1':
                        var data = Object.assign({
                            MsgType: 'text',
                            Content: '点击搜索',
                          }, baseData);
             
                          resolve(builder.buildObject(data));
                }
            }
            resolve('');
            break;
          default:
            resolve('');
            break;
        }
      });
    });
  }
module.exports=getmsg