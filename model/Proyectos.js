const { DataTypes } = require('sequelize');

const db = require('../config/db');

const Proyectos = db.define('proyectos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: DataTypes.STRING,
  url: DataTypes.STRING
});

module.exports = Proyectos;
