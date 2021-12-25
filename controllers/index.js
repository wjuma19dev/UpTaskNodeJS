const Proyecto = require('../model/Proyectos');
const { validationResult } = require('express-validator');


exports.index = async (req, res) => {
  const proyectos = await Proyecto.findAll();
  res.render('index', {
    nombrePagina: 'Proyectos',
    proyectos
  });
}

exports.proyectoPorUrl = async (req, res, next) => {
  const proyectos = await Proyecto.findAll();
  const proyecto = await Proyecto.findOne({ where: { url: req.params.url } });


  // Si no hay proyectos con la url
  if(!proyecto) return next();

  res.render('tareas', {
    nombrePagina: 'Tareas del proyecto',
    proyecto: proyecto.dataValues,
    proyectos
  });

}

exports.formularioEditar = async (req, res) => {

  const proyectos = await Proyecto.findAll();
  const proyecto = await Proyecto.findOne({
    where: { id: req.params.id }
  });

  console.log(proyecto);
  res.render('nuevo-proyecto', {
      nombrePagina: 'Editar Proyecto',
      proyectos,
      proyecto
  });

}

exports.nuevoProyecto = async (req, res) => {
  const proyectos = await Proyecto.findAll();
  res.render('nuevo-proyecto', {
      nombrePagina: 'Nuevo Proyecto',
      proyectos
  });
}

exports.nuevoProyectoPost = async (req, res) => {
  const proyectos = await Proyecto.findAll();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('nuevo-proyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos,
        errors
    });
  }
  const { nombre } = req.body;
  await Proyecto.create({ nombre });
  res.redirect('/');
}
