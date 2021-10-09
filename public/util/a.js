var $mysql   = require("mysql");
var sql = require("../sql/mysql.js");       //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql)       //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
let jwt = require("jsonwebtoken")
$sql.connect() 
function getMenu(role){
    let roleName='' 
    // let thesql = "updata " 
    $sql.query("select * from authority_table where role_id = ?",[role],function (err, result) {
        roleName=result[0].role
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
            console.log(parentMenu)
        })
        

    })
}
getMenu(1)