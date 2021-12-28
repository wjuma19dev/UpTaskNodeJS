import axios from "axios";

const tareas = document.querySelectorAll('#tarea');
// const tareaTexto = document.getElementById('tarea-texto');

if(tareas) {
  for(tarea of tareas) {
    tarea.addEventListener('click', e => {
  
      if(e.target.classList.contains('bi-check-circle')) {
        const icono = e.target;
        const tareaId = icono.parentElement.parentElement.dataset.tarea; 

        // Request hacia /tarea/:id
        const url = `${location.origin}/tarea/${tareaId}`;
        axios.patch(url, { tareaId })
          .then(function(response) {
            // console.log(response);

            if(response.status === 201) {
              // Marcar automaticamente el checker de la taera
              icono.classList.toggle('completo');

              // Marcar el texto de la tarea con una linea cuando es completada
              icono.parentElement.parentElement.children[0].children[1].classList.toggle('line-through');
            }
          })
          .catch(function(error){
            console.log(error);
          });
      }

    });
  }
}

export default tareas;