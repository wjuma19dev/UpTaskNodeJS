const express = require('express');
const router = express.Router();

const controllers = require('../controllers');

// Express validator
const { body } = require('express-validator');

module.exports = function() {

  router.get('/', controllers.index);

  router.get('/nuevo-proyecto', controllers.nuevoProyecto);

  router.post('/nuevo-proyecto',
  body('nombre', 'El campo "Nombre del proyecto" no debe de estar vacio, por favor completa el mismo y trata de nuevo!')
    .not().isEmpty().trim().escape(),
  controllers.nuevoProyectoPost);

  // Listar proyectos
  router.get('/proyectos/:url', controllers.proyectoPorUrl);

  // Editar proyecto
  router.get('/proyecto/editar/:id', controllers.formularioEditar);
  router.post('/proyecto/editar/:id',
  body('nombre', 'El campo "Nombre del proyecto" no debe de estar vacio, por favor completa el mismo y trata de nuevo!')
    .not().isEmpty().trim().escape(),
  controllers.actualizarProyecto);

  return router;

}
