import axios from "axios";
import Swal from 'sweetalert2';

import { actualizarAvance } from '../funciones/avance';

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
            console.log(response);

            if(response.status === 201) {

              // Marcar automaticamente el checker de la taera
              icono.classList.toggle('completo');
              if(icono.classList.contains('completo')) {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Tarea completada!',
                  showConfirmButton: false,
                  timer: 1500
                });
              }

              // Marcar el texto de la tarea con una linea cuando es completada
              icono.parentElement.parentElement.children[0].children[1].classList.toggle('line-through');

              // Actualizar la barra de progreso luego de completar una tarea
              actualizarAvance();
            }
          })
          .catch(function(error){
            console.log(error);
          });
      }

      if(e.target.classList.contains('bi-trash')){
        
        // Accediendo al elemento li padre y al ID de la tarea
        const tareaHTML = e.target.parentElement.parentElement,
              tareaId = tareaHTML.dataset.tarea;

              Swal.fire({
                title: 'Deseas eliminar esta tarea?',
                text: "Una tarea eliminada no se puede recuperar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar!',
                cancelButtonText:'No, cancelar!'
              }).then((result) => {
                if (result.isConfirmed) {

                  // Enviar peticion axios al servidor con el id de la tarea
                  const url = `${location.origin}/tarea/${tareaId}`; 
                  axios.delete(url, { params: { tareaId } })
                    .then(function(respuesta){
                      if(respuesta.status === 200) {

                        Swal.fire(
                          'Eliminado!',
                          'La tarea se ha borrado!.',
                          'success'
                        ).then(() => {
                          tareaHTML.parentElement.removeChild(tareaHTML);

                          // Actualizar la barra de progreso luego de borrar una tarea
                          actualizarAvance();
                        });
                      }
                    })
                    .catch(function(error){
                      console.log(error);
                    });

                }
              });
      }

    });
  }
}

export default tareas;