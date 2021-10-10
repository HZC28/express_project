var qr = require('qr-image')
let fs=require('fs')

// 创建可以写入流，当有pipe它的时候就会生成一个userStr.png的文件
function qrcode(req, res, next){
    let id=new Date().getTime()+Math.floor(Math.random() * 10000)+''
    var text = "313131"
    let obj={
        a:1,
        b:2
    }
    // 生成二维码文件流
    var qr_svg=qr.image(JSON.stringify(obj),{size: 10});
    var qr_png=qr.image(JSON.stringify(obj),{ec_level:"M",type:"png"});
    // 创建可以写入流，当有pipe它的时候就会生成一个userStr.png的文件
    var img=fs.createWriteStream(`E:/hjc/image/qr${id}.png`);
    // 将生成的二维码流pipe进入刚刚创建的可写入流，并生成文件
    qr_png.pipe(img);
    // 创建请求二维码api
    try {
      res.writeHead(200, {'Content-Type': 'image/png'});
      // 将生成的二维码流写入到相应中
      qr_svg.pipe(res);
    } catch (e) {
      res.writeHead(414, {'Content-Type': 'text/html'});
      res.end('<h1>414 Request-URI Too Large</h1>');
    }
}
module.exports=qrcode