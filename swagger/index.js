var path = require('path');
var express = require('express');
var swaggerUi = require('swagger-ui-express')
var swaggerJSDoc = require('swagger-jsdoc')
// 配置 swagger-jsdoc
const options = {
  definition: {
    // 采用的 openapi 版本 不用改
    openapi: '3.0.0',
    schemes:['http','https'],
    // 页面基本信息 自由发挥
    info: {
      title: 'express项目',
      version: '1.0.0',
      description:"This is a sample server Petstore server.  You can find out more about     Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).      For this sample, you can use the api key `special-key` to test the authorization     filters."
    }, 
  },
  // 去哪个路由下收集 swagger 注释
  apis: [path.join(__dirname, '../routes/**/api/*.js')]
}
var swaggerJson = function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  console.log(swaggerSpec)
  res.send(swaggerSpec);
  
}
const swaggerSpec = swaggerJSDoc(options)

var swaggerInstall = function(app) {
    // console.log(swaggerSpec)
  if (!app){
    app = express()
  }
  // 开放相关接口，
  app.get('/swagger.json', swaggerJson);
  // 使用 swaggerSpec 生成 swagger 文档页面，并开放在指定路由
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
module.exports = swaggerInstall