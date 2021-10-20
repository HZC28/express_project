const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize=require("../sequelize/index")


/**
 * @author chaojilaji
 * 数据表websites的关系对象映射
 */
class Token extends Model {

}
Token.init({
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    code: Sequelize.STRING(255),
    msg: Sequelize.STRING(255),
    token: Sequelize.STRING(255)
}, {
    sequelize,
    modelName: 'token_table',
    timestamps:false,
    freezeTableName: true
});
module.exports = Token;