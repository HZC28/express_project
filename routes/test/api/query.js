var $mysql = require("mysql");
var sql = require("../../../public/sql/mysql.js"); //   这句话是，引入当前目录的mysql模板   mysql就是我们上面创建的mysql.js
var $sql = $mysql.createConnection(sql.mysql) //创建一个连接        mysql是我们上面文件暴露出来的模板的方法
let jwt = require("jsonwebtoken")
const sequelize = require("../../../public/sequelize/index")
const WebSite = require("../../../public/Model/user.js")
const request = require("request")
const { Op } = require("sequelize");
let Articles = require("../../../public/Model/articles.js")
$sql.connect()


async function query(req, res, next) {
    // comments: Sequelize.STRING(255),
    // avatarurl:Sequelize.STRING(255),
    // title:Sequelize.STRING(255),
    // desc:Sequelize.STRING(255),
    // user_url:Sequelize.STRING(255),
    // avatar:Sequelize.STRING(255),
    // url:Sequelize.STRING(255)
    let arr = ['avatarurl', 'user_url', 'avatar', 'url']
    // 'company'
    let query = {}
    let current = parseInt(req.query.currentPage) >= 1 ? parseInt(req.query.currentPage) : 1
    let page = parseInt(req.query.pageSize) >= 1 ? parseInt(req.query.pageSize) : 2
    // console.log(Object.keys(req.query))
    arr.forEach(val => {
        if (req.query[val] != undefined && req.query[val] != '') {
            query[val] = req.query[val]
        }
    })
    // 模糊查询
    if (req.query['desc'] != undefined && req.query['desc'] != '') {
        query['desc'] = {
            [Op.like]: `%${req.query['desc']}%`
        }
    }
    if (req.query['title'] != undefined && req.query['title'] != '') {
        query['title'] = {
            [Op.like]: `%${req.query['title']}%`
        }
    }
    await sequelize.sync();
    let x = await Articles.findAll({
        limit: page,
        offset: page * (current - 1),
        where: query
    })
    // 获取总数量
    let count = await Articles.count({
        where: query
    })
    let data = {}
    data.currentPage=current
    data.pageSize=page
    data.total = count
    data.list = x;
    res.send(data)
}
module.exports = query