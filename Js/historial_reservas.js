function cerrarSesion() {
  alert("Sesión cerrada.");
}

function regresar() {
  alert("Regresando a la pantalla anterior...");
}

// Filtro de búsqueda
document.getElementById('busqueda').addEventListener('input', function () {
  const filtro = this.value.toLowerCase();
  const filas = document.querySelectorAll('#tablaReservas tbody tr');

  filas.forEach(fila => {
    const textoFila = fila.textContent.toLowerCase();
    fila.style.display = textoFila.includes(filtro) ? '' : 'none';
  });
});

// Acción al hacer clic en "Ver"
document.querySelectorAll('.ver-link').forEach(link => {
  link.addEventListener('click', () => {
    alert('Visualización de detalles no implementada aún.');
  });
});
