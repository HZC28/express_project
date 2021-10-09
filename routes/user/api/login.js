var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
let jwt = require("jsonwebtoken")
$sql.connect() 
/**,
 * @swagger
 * /user/login:
 *    post:
 *      tags:
 *      - 用户    #接口分类
 *      summary: 登录   #接口备注
 *      description: 登录接口   #接口描述
 *      produces:
 *      - "application/xml"
 *      - "application/json"
 *      parameters:
 *      - name: "name"
 *        in: "query"
 *        description: "用户账号"
 *        required: true
 *        type: "string"
 *      - name: "password"
 *        in: "query"
 *        description: "用户密码"
 *        required: true
 *        type: "string"
 *      example:        #请求参数样例。
 *        username: "string"
 *        password: "string"
 *      responses:  #编写返回体
 *        200:     #返回code码
 *          description: 登录成功    #返回code码描述
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          code:   #返回的code码
 *                              type: number
 *                              description: 200
 *                          msg:    #返回体信息。***注意写的位置一定要和res_code对齐。
 *                               type: string   #返回体信息类型
 *                               description: 登录成功
 * */
function login(req, res, next) {
    let { name,password } = req.query;
    let thesql = "select * from user_table where name = ?" 
    // let thesql = "updata " 
    $sql.query(thesql,[name],function (err, result) {
        if (err) {
            console.log('查询数据库失败');
        } else {
            // console.log(result[0]);
            let data;
            if (result.length) {
                if(result[0].password==password){
                    let token = jwt.sign({
                        username:name
                    },"abc",{
                        expiresIn: 60*60*24
                    })
                    getMenu(result[0].role,token,name,res)
                }else{
                    data = {
                        code: 100,
                        list: "账号名或者密码有误"
                    }
                    res.send(data)
                }
                
            } else {
                data = {
                    code: 100,
                    msg: '对不起，您输入的账号未注册'
                }
                res.send(data)
            }
            
        }
    })
}
// 获取角色权限
function getMenu(role,token,name,respone){
    let roleName='' 
    // let thesql = "updata " 
    $sql.query("select * from authority_table where role_id = ?",[role],function (err, result) {
        // roleName=result[0].role
        let menuids=result[0].authority.split(',')
        // console.log(menuids)
        let thesql = "select * from menu_table"
        let arr=[]
        let newArr=[]
        $sql.query(thesql,function(err,res){
            arr=res
            for(let i=0;i<menuids.length;i++){
                for(let k=0;k<arr.length;k++){
                    if(arr[k].menuid==menuids[i]){newArr.push(arr[k]);break}
                }
            }
            // console.log(newArr)
            let parentMenu=newArr.filter(val=>{return val.type==1})
            let childMenu=newArr.filter(val=>{return val.type==2})
            parentMenu.forEach(val=>{
                val.children=[]
                val.children=childMenu.filter(value=>{
                    // console.log(value)
                    // console.log(value.parent_menuid==val.menuid)
                    return value.parent_menuid==val.menuid
                })
            })
            // console.log(parentMenu)
            let data = {
                code: 200,
                msg: "登录成功",
                data:{
                    username:name,
                    token:token,
                    menus:parentMenu
                }
            }
            respone.send(data)
        })
        

    })
}
module.exports=login