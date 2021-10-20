const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize=require("../sequelize/index")

/**
 * @author chaojilaji
 * 数据表websites的关系对象映射
 */
class WebSite extends Model {

}

WebSite.init({
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type:Sequelize.STRING(255),
        primaryKey: true,
        unique: true
    } ,
    password: Sequelize.STRING(1024)
    
}, {
    sequelize,
    modelName: 'encryption_table',
    timestamps:false,
    freezeTableName: true
});
module.exports = WebSite;