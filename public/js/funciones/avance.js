export const actualizarAvance = () => {


	const tareas = document.querySelectorAll('li#tarea');

	if(tareas.length) {

		const tareasCompletadas = document.querySelectorAll('i.completo'),
					avance = Math.round(tareasCompletadas.length / tareas.length * 100);

		const barraProgreso = document.querySelector('.porcentaje');
		document.querySelector('.pct-counter').innerHTML = `${avance}%`;

		barraProgreso.style.width = `${avance}%`;
		barraProgreso.dataset.fill = `${avance}%`;

		console.log(avance)
	}


}