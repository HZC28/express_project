const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize=require("../sequelize/index")

/**
 * @author chaojilaji
 * 数据表websites的关系对象映射
 */
class Shop extends Model {

}

Shop.init({
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    type_id: Sequelize.STRING(255),
    shop_name:Sequelize.STRING(255),
    shop_price:Sequelize.STRING(255),
    shop_detail:Sequelize.STRING(255)
    // user: Sequelize.STRING(255),
    // file_name: Sequelize.STRING(255)
}, {
    sequelize,
    modelName: 'shop_table',
    timestamps:false,
    freezeTableName: true
});
module.exports = Shop;