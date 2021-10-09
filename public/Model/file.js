const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize=require("../sequelize/index")

// const sequelize = new Sequelize('first', 'root', 'root', {
//     host:'localhost',
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 30000
//     }
// });

/**
 * @author chaojilaji
 * 数据表websites的关系对象映射
 */
class WebSite extends Model {

}

WebSite.init({
    file_id: Sequelize.STRING(255),
    file_address: Sequelize.STRING(255),
    user: Sequelize.STRING(255),
    file_name: Sequelize.STRING(255)
}, {
    sequelize,
    modelName: 'file_table',
    timestamps:false,
    freezeTableName: true
});
module.exports = WebSite;