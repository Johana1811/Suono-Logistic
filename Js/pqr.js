document.getElementById('enviar').addEventListener('click', function () {
  const tipo = document.getElementById('tipo').value;
  const asunto = document.getElementById('asunto').value;
  const descripcion = document.getElementById('descripcion').value;

  if (!tipo || !asunto || !descripcion) {
    alert('Por favor complete todos los campos obligatorios.');
    return;
  }

  alert('PQR enviada correctamente ✅');
});

document.getElementById('menu').addEventListener('click', function () {
  alert('Redirigiendo al menú principal...');
});
