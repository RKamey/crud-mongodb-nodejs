const deleteButtons = document.querySelectorAll('.btnDelete');
const updateButtons = document.querySelectorAll('.btnUpdateRestaurant');

// Agregar alerta cuando haya sido borrado un restaurante
const confirmarBorrado = (restauranteId) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "No podrás recuperar el restaurante borrado",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Borrar',
    cancelButtonText: 'Cancelar',
    dangerMode: true,
  }).then((result) => {
    if (result.isConfirmed) {
        window.location.href = `/deleteRestaurant/${restauranteId}`;
        Swal.fire('El restaurante ha sido borrado','', 'success');
    } else {
      Swal.fire('El restaurante no ha sido borrado');
    }
  });
};

const confirmarActualizacion = (restauranteId) => {
Swal.fire({
  title: '¿Estás seguro?',
  text: "Los datos del restaurante serán actualizados",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Actualizar',
  cancelButtonText: 'Cancelar',
  dangerMode: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Realizar solicitud POST al servidor
        fetch(`/updateRestaurant`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: restauranteId })
        })
        .then((response) => {
          if (response.ok) {
            Swal.fire('El restaurante ha sido actualizado', '', 'success');
            window.location.href = '/restaurants';
          } else {
            Swal.fire('Hubo un error al actualizar el restaurante');
          }
        })
        .catch((error) => {
          Swal.fire('Hubo un error al actualizar el restaurante');
        });
      } else {
        Swal.fire('El restaurante no ha sido actualizado');
      }
    });
};
  

deleteButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const restauranteId = btn.getAttribute('data-restaurant-id');
    confirmarBorrado(restauranteId);
  });
});


updateButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const restauranteId = btn.getAttribute('data-restaurant-id');
      confirmarActualizacion(restauranteId);
    });
});

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
  
    const clickedButton = event.submitter;
    
    if (clickedButton.classList.contains('search-button')) {
      // Si el botón hace parte de la búsqueda, no muestra la alerta de guardar
      event.target.submit();
      return;
    }
  
    // Muestra una alerta de confirmación antes de enviar el formulario
    Swal.fire({
      title: 'Guardar Restaurante',
      text: '¿Estás seguro de guardar el restaurante?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Deshabilita el botón de guardar después de enviar el formulario
        const submitButton = document.querySelector('.btnSaveRestaurant');
        submitButton.disabled = true;
  
        // Muestra una alerta de éxito después de enviar el formulario
        Swal.fire('Restaurante agregado', 'El restaurante ha sido guardado correctamente', 'success');
  
        // Envía el formulario si se confirmó la acción
        event.target.submit();
      } else {
        // Muestra una alerta de cancelación si se canceló la acción
        Swal.fire('Acción cancelada', 'El restaurante no ha sido guardado', 'info');
      }
    });
  });
  
  
  
  
  
  
  
  
  