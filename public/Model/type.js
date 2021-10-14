const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize=require("../sequelize/index")

/**
 * @author chaojilaji
 * 数据表websites的关系对象映射
 */
class Type extends Model {

}

Type.init({
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    type_name: Sequelize.STRING(255),
    // user: Sequelize.STRING(255),
    // file_name: Sequelize.STRING(255)
}, {
    sequelize,
    modelName: 'type_table',
    timestamps:false,
    freezeTableName: true
});
module.exports = Type;