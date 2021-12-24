exports.index = (req, res) => {
    res.render('index', {
        nombrePagina: 'Proyectos'
    });
}

exports.about = (req, res) => {
    res.render('about') ;
}

exports.nuevoProyecto = (req, res) => {
    res.render('nuevo-proyecto', {
        nombrePagina: 'Nuevo Proyecto'
    })
}

exports.nuevoProyectoPost = (req, res) => {

    const { nombre } = req.body;
    let errores = [];

    if(!nombre) {
        errores.push({'texto': 'Agrega un nombre al proyecto'});
    }

    if(errores.length > 0) {
        res.render('nuevo-proyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores
        });
    } else {

      // Insertar en la base datos

    }


}
