const  {Sequelize}  = require('sequelize');
//const { Sequelize, Op, Model, DataTypes } = require("sequelize");


const   db =new Sequelize('apiRest','postgres','admin123',{ 
    host:'localhost',
    dialect:'postgres',

});

module.exports=db;