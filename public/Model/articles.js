const {Sequelize, DataTypes, Model} = require('sequelize');
const sequelize=require("../sequelize/index")

/**
 * @author chaojilaji
 * 数据表websites的关系对象映射
 */
class Articles extends Model {

}

Articles.init({
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    comments: Sequelize.STRING(255),
    avatarurl:Sequelize.STRING(255),
    title:Sequelize.STRING(255),
    desc:Sequelize.STRING(255),
    user_url:Sequelize.STRING(255),
    avatar:Sequelize.STRING(255),
    url:Sequelize.STRING(255)
}, {
    sequelize,
    modelName: 'articles_table',
    timestamps:false,
    freezeTableName: true
});
module.exports = Articles;