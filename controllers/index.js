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
  const proyectosPromise = Proyecto.findAll();
  const proyectoPromise = Proyecto.findOne({
    where: { url: req.params.url }
  });
  const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);
  // Si no hay proyectos con la url
  if(!proyecto) return next();
  res.render('tareas', {
    nombrePagina: 'Tareas del proyecto',
    proyectos,
    proyecto
  });

}

exports.formularioEditar = async (req, res) => {
  const proyectosPromise = Proyecto.findAll();
  const proyectoPromise = Proyecto.findOne({
    where: { id: req.params.id }
  });
  const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);
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

exports.actualizarProyecto = async (req, res) => {
  const proyectos = await Proyecto.findAll();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('nuevo-proyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        errors
    });
  }
  const { nombre } = req.body;
  await Proyecto.update({ nombre: nombre },{ where: {id: req.params.id }});
  res.redirect('/');
}
