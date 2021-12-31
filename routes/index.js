const express = require('express');
const router = express.Router();

const proyectosController = require('../controllers/proyectos');
const tareasController = require('../controllers/tareas');
const authController = require('../controllers/auth');

// Express validator
const { body } = require('express-validator');

module.exports = function() {

  router.get('/', proyectosController.index);

  router.get('/nuevo-proyecto', proyectosController.nuevoProyecto);

  router.post('/nuevo-proyecto',
  body('nombre', 'El campo "Nombre del proyecto" no debe de estar vacio, por favor completa el mismo y trata de nuevo!')
    .not().isEmpty().trim().escape(),
    proyectosController.nuevoProyectoPost);

  // Listar proyectos
  router.get('/proyectos/:url', proyectosController.proyectoPorUrl);

  // Editar proyecto
  router.get('/proyecto/editar/:id', proyectosController.formularioEditar);
  router.post('/proyecto/editar/:id',
  body('nombre', 'El campo "Nombre del proyecto" no debe de estar vacio, por favor completa el mismo y trata de nuevo!')
    .not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto);

  // Eliminar proyecto
  router.delete('/proyectos/:proyectoUrl', proyectosController.eliminarProyecto);

  // Tareas
  router.post('/proyectos/:proyectoUrl', tareasController.agregarTarea);

  // Actualizar tarea
  router.patch('/tarea/:id', tareasController.cambiarEstadoTarea);

  // Eliminar una tarea
  router.delete('/tarea/:tareaId', tareasController.eliminarTarea);

  // Registro de usuarios
  router.get('/auth/signup', authController.registroDeUsuario);

  return router;

}
