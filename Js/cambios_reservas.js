// app.js
document.getElementById('cambiosForm').addEventListener('submit', function(event) {
  event.preventDefault();

  document.getElementById('mensajeResultado').textContent =
    'Tu reserva ha sido modificada con éxito. Revisa tu correo electrónico para ver los detalles actualizados.';
});

function cambiarReserva() {
  alert("Puedes modificar los datos y luego hacer clic en 'Confirmar'.");
}

function cancelarReserva() {
  const confirmacion = confirm("¿Estás seguro de que deseas cancelar esta reserva?");
  if (confirmacion) {
    document.getElementById('cambiosForm').reset();
    document.getElementById('mensajeResultado').textContent = "La reserva ha sido cancelada correctamente.";
  }
}
