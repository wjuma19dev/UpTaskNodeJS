const Proyectos = require('../model/Proyectos');
const Tarea = require('../model/Tareas');

exports.agregarTarea = async (req, res, next) => {

  const proyecto = await Proyectos.findOne({ where: { url: req.params.proyectoUrl } });

  // leer el valor del input
  const {tarea} = req.body;

  // estado 0 = incompleto & id del proyecto
  const estado = 0;
  const proyectoId = proyecto.id;

  // Insertar en la base de datos
  const resultado = await Tarea.create({ tarea, estado, proyectoId });
  if(!resultado) {
    return next();
  }
  
  // Redireccionar
  res.redirect(`/proyectos/${req.params.proyectoUrl}`);

}

exports.cambiarEstadoTarea = async (req, res, next) => {

  const { id } = req.params;

  // Consultar la tarea en la base de datos
  const tarea = await Tarea.findOne({ where: { id } });

  // Cambiamos el estado de la tarea
  let estado = 0;
  if(tarea.estado === estado) {
    estado = 1;
  }
  tarea.estado = estado;

  const resultado = await tarea.save();

  if(!resultado) {
    return next();
  }

  res.status(201).send('Tarea actualizada correctamente');

}

exports.eliminarTarea = async (req, res, next) => {

  const { tareaId } = req.params;
  const resultado = await Tarea.destroy({ where: { id: tareaId } });

  if(!resultado) {
    return next();
  }

  res.send('Tarea eliminada correctamente!!!');
}