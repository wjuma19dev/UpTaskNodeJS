const slug = require('slug');
const shortid = require('shortid');
const { DataTypes } = require('sequelize');

const db = require('../config/db');

const Proyectos = db.define('proyectos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: DataTypes.STRING(100),
  url: DataTypes.STRING(100)
}, {
  hooks: {
    beforeCreate(proyecto) {
      const url = slug(proyecto.nombre).toLowerCase();
      proyecto.url = `${url}-${shortid.generate()}`;
    }
  }
});

module.exports = Proyectos;
