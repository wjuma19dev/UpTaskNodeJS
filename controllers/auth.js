exports.registroDeUsuario = (req, res, next) => {

	res.render('authentication/signup', {
		nombrePagina: 'Registro de usuario'
	});
}