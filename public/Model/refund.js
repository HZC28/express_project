const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize=require("../sequelize/index")

/**
 * @author chaojilaji
 * 数据表websites的关系对象映射
 */
class WebSite extends Model {

}

WebSite.init({
    refund_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    refund_no: {
        type:DataTypes.STRING,
        primaryKey: true,
        unique: true
    },
    order_name: Sequelize.STRING(255),
    order_price: Sequelize.STRING(255),
    order_detail: Sequelize.STRING(255),
    buyer_logon_id: Sequelize.STRING(255),
    buyer_user_id: Sequelize.STRING(255),
    order_no: Sequelize.STRING(255),
    refund_noney: Sequelize.STRING(255)

}, {
    sequelize,
    modelName: 'refund_table',
    freezeTableName: true
});

module.exports = WebSite;