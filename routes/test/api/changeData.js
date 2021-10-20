var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
const sequelize=require("../../../public/sequelize/index")
const WebSite=require("../../../public/Model/articles.js")
$sql.connect() 
// 新增：insert into 表名(字段,字段) values(值,值)
// 删除：delete from 表名 where 条件
// 修改：update 表名 set 字段=值 where 条件
// 查询：select 字段,字段/* from 表名 (where 条件)
/**,
 * @swagger
 * /users/changeUserInfo:   #路由地址
 *    post:
 *      tags: 
 *      - 用户管理    #接口分类
 *      summary: 添加用户   #接口备注
 *      description: 添加用户   #接口描述
 *      consumes:
 *      - "application/json"    #接口接收参数方式
 *      requestBody:    #编写参数接收体
 *          required: true  #是否必传
 *          content:
 *              application/json:
 *                  schema:     #参数备注
 *                      type: object    #参数类型
 *                      properties:
 *                          username:
 *                                  type: string    #参数类型
 *                                  description: 用户名     #参数描述
 *                          password:
 *                                  type: string    #参数类型
 *                                  description: 密码     #参数描述
 *                  example:        #请求参数样例。
 *                      username: "string"
 *                      password: "string"
 *      responses:  #编写返回体
 *        200:     #返回code码
 *          description: 注册成功     #返回code码描述
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          code:   #返回的code码
 *                              type: string
 *                              description: 返回code码
 *                          msg:    #返回体信息。***注意写的位置一定要和res_code对齐。
 *                               type: string   #返回体信息类型
 *                               description: 返回信息
 *                          data:
 *                                type: object
 *                                description: 返回数据
 *        -1:
 *          description: 注册失败
 * */

// 修改账号信息
async function changeUserInfo(req, res, next) {
    if(req.body.id==undefined||req.body.id==''){
        res.send({
            code:100,
            msg:"id为必传参数"
        })
        return
    }
    let obj=req.body
    let arr=['avatarurl', 'user_url', 'avatar', 'url',"comments","title"]
    let query={}
    // console.log(Object.keys(req.query))
    arr.forEach(val=>{
        if(obj[val]!=undefined&&obj[val]!=''){
            query[val]=obj[val]
        }  
    })
    await sequelize.sync(); 
    let data={
        code:200,
        msg:"修改成功"
    }
    let result = await WebSite.findAll({where:{ id:obj.id}})
    if(result.length==0){
        data={
            code:100,
            msg:"数据不存在"
        }
        res.send(data)
        return
    }
    try{
        let x = await WebSite.update(query,{ 
            where:{
                id:obj.id
            }
        })
    }catch(err){
        data={
            code:100,
            msg:"修改失败"
        }
        res.send(data)
        return
    }
    
    res.send(data)
}
module.exports=changeUserInfo