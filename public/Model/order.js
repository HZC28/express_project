const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize=require("../sequelize/index")

/**
 * @author chaojilaji
 * 数据表websites的关系对象映射
 */
class WebSite extends Model {

}

WebSite.init({
    order_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    order_no: {
        type:DataTypes.STRING,
        primaryKey: true,
        unique: true
    },
    order_pay_type:Sequelize.STRING(255),
    order_name: Sequelize.STRING(255),
    order_price: Sequelize.STRING(255),
    order_state: Sequelize.STRING(255),
    order_state_msg: Sequelize.STRING(255),
    order_detail: Sequelize.STRING(255),
    order_buyer_logon_id: Sequelize.STRING(255),
    order_buyer_user_id: Sequelize.STRING(255),
}, {
    sequelize,
    modelName: 'order_table',
    freezeTableName: true
});

module.exports = WebSite;