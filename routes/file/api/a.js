let jwt = require("jsonwebtoken")
let token = jwt.sign({
    username:"19854818214"
},"abc",{
    expiresIn: 60
})
console.log(token);
//将token和数据库信息返回给前端
// res.send({
//     err:0,
//     msg:"用户登录成功！",
//     data:"数据库的数据",
//     token
// })
// 1632813216259
jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjE5ODU0ODE4MjE0IiwiaWF0IjoxNjMyODE4MTk2LCJleHAiOjE2MzI4MTgyNTZ9.QKZZRSZ16aaWoSrKoXzb4_Iivv8I0yiE5IYj6cxc8p4","abc",(err,decode)=>{
    //第一个参数传递token
    //第二个参数解密规则
    //回调函数
    console.log("decode",decode);
    if(err){
        console.log({
            err:0,
            msg:"当前登录失败"
        })
    }else{
        console.log({
            err:0,
            msg:"数据返回成功",
            data:"数据库"
        })
    }                    
})