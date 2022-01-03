const { DataTypes } = require('sequelize');
const db = require('../config/db');

// Los usuarios pueden crear multiples proyectos,
// los proyectos las tareas.
const Proyectos = require('./Proyectos');

// Hasheamos la password
const bcrypt = require('bcrypt'),
      saltRounds = 10,
      salt = bcrypt.genSaltSync(saltRounds);


const Usuarios = db.define('usuarios', {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Ingresa un correo válido'
      },
      notEmpty: {
        msg: 'La contraseña no debe ir vacia'
      }
    },
    unique: {
      args: true,
      msg: 'El usuario ya existe'
    }
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'La contraseña no debe ir vacia'
      }
    }
  }
}, {
  hooks: {
    // Antes de guardar el usuario en la base de datos, hasheamos la contrasena.
    beforeCreate(usuario) {
      usuario.password = bcrypt.hashSync(usuario.password, salt);
    }
  }
});

// Creamos la llave foranea de usuarios hacia proyectos.
Usuarios.hasMany(Proyectos);

module.exports = Usuarios;