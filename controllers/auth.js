const Usuario = require('../model/Usuarios');

exports.registroDeUsuario = (req, res, next) => {

	res.render('authentication/signup', {
		nombrePagina: 'Crear cuenta'
	});
}

exports.postRegistroDeUsuario = async (req, res, next) => {

	// Leer datos
	const { email, password } = req.body;

	// Crear usuario
	try {
		await Usuario.create({ email, password });
		res.redirect('/iniciar-sesion');
	} catch (error) {
		req.flash('error', error.errors.map(error => error.message));
		res.render('authentication/signup', {
			mensajes: req.flash(),
			nombrePagina: 'Crear cuenta'
		});
	}

}

exports.iniciarSession = (req, res, next) => {

	res.render('authentication/login', {
		nombrePagina: 'Iniciar sesion'
	});
}