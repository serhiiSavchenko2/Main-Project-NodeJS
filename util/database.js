const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'nodejsmain', //database name
    'root',       //user
    'mysql555',   //password
    {
        dialect: 'mysql',
        host: 'localhost'
    }
);

module.exports = sequelize;