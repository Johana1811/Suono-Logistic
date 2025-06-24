// Filtro de búsqueda
const searchInput = document.querySelector('.buscador');
const tableRows = document.querySelectorAll('tbody tr');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  tableRows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(query) ? '' : 'none';
  });
});

// Botones funcionales
document.querySelector('.btn.cerrar').addEventListener('click', () => {
  alert('Sesión cerrada.');
});

document.querySelector('.btn:nth-child(1)').addEventListener('click', () => {
  alert('Funcionalidad de modificar aún no implementada.');
});

document.querySelector('.btn:nth-child(2)').addEventListener('click', () => {
  alert('Informe generado correctamente.');
});

document.querySelector('.btn:nth-child(3)').addEventListener('click', () => {
  location.reload();
});

// Enlaces Ver y Editar
document.querySelectorAll('a.ver').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    alert('Vista detallada de la reserva .');
  });
});

document.querySelectorAll('a.editar').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    alert('Formulario de edición abierto .');
  });
});
