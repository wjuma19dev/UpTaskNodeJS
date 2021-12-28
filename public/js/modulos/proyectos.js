import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if(btnEliminar) {

  btnEliminar.addEventListener('click', e => {

    const proyectoUrl = e.target.dataset.proyectoUrl;
    
    Swal.fire({
      title: 'Deseas eliminar este proyecto?',
      text: "Un proyecto eliminado no se puede recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!',
      cancelButtonText:'No, cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {

        // Enviar peticion a axios
        const url = `${location.origin}/proyectos/${proyectoUrl}`;
        axios.delete(url, { params: proyectoUrl })
          .then(respuesta => {

            console.log(respuesta);

            Swal.fire(
              'Proyecto eliminado!',
              'El proyecto se ha eliminado.',
              'success'
            );
      
            // Redireccionar al inicio
            setTimeout(() => {
              window.location.href = '/';
            }, 3000);

          })
          .catch(error => {

            Swal.fire({
              icon: 'error',
              title: 'Hubo un error!',
              text: 'No se pudo eliminar el proyecto'
            });

          });
        
      }
    })
  
  });

}

export default btnEliminar;
