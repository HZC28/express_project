var $mysql   = require("mysql");
var sql = require("../../../public/sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
$sql.connect() 
// 新增：insert into 表名(字段,字段) values(值,值)
// 删除：delete from 表名 where 条件
// 修改：update 表名 set 字段=值 where 条件
// 查询：select 字段,字段/* from 表名 (where 条件)
/**,
 * @swagger
 * /user/register:
 *    get:
 *      tags:
 *      - 用户    #接口分类
 *      summary: 用户注册接口   #接口备注
 *      description: 用户注册接口   #接口描述
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
 *      responses:  #编写返回体
 *        200:     #返回code码
 *          description: 注册成功    #返回code码描述
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
// 注册账号
function registered(req, res, next) {
    let { name,password } = req.query;
    let thesql = "insert into user_table(name,password) values(?,?)" 
    $sql.query(thesql,[name,password],function (err, result) {
        if (err) {
            console.log(err);
            res.send({
                code: 100,
                msg: "该账号已注册过"
            })
        } else {
            console.log(result);
            let data;
            if (result.affectedRows!=0) {
                data = {
                    code: 200,
                    msg: "注册成功"
                }
            } else {
                data = {
                    code: 100,
                    msg: "注册失败"
                }
            }
            res.send(data)
        }
    })
}
module.exports=registered