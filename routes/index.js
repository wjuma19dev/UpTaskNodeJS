const express = require('express');
const router = express.Router();

const controllers = require('../controllers');

module.exports = function() {

    router.get('/', controllers.index);

    router.get('/about', controllers.about);

    router.get('/nuevo-proyecto', controllers.nuevoProyecto);

    router.post('/nuevo-proyecto', controllers.nuevoProyectoPost);

    return router;

}