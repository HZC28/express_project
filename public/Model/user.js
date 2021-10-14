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
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type:DataTypes.STRING,
        primaryKey: true,
        unique: true
    },
    age: Sequelize.STRING(255),
    img: Sequelize.STRING(255),
    password: Sequelize.STRING(255),
    role: Sequelize.INTEGER,
    login_time: Sequelize.INTEGER,
    company: Sequelize.STRING(255),
    phone: Sequelize.STRING(255),
    email: Sequelize.STRING(255),
    changeTime: Sequelize.STRING(255)
}, {
    sequelize,
    modelName: 'user_table',
    // timestamps:false,
    freezeTableName: true
});

// (async () => {
//     await sequelize.sync();
//     let x = await WebSite.create({
//         url: 'http://www.xxxxxxxx.com/',
//         title: 'demo2'
//     });
//     console.log(x);
// })();

module.exports = WebSite;