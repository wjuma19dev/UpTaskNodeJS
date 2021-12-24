const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('uptasknode', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
