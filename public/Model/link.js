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
    title: Sequelize.STRING(255),
    longlink: Sequelize.STRING(1024),
    shortlink: {
        type:Sequelize.STRING(255),
        primaryKey: true,
        unique: true
    }
    
}, {
    sequelize,
    modelName: 'link_table',
    timestamps:false,
    freezeTableName: true
});
module.exports = WebSite;