function calcularTotal() {
  const cantidad = parseFloat(document.getElementById('cantidad').value) || 0;
  const precio = parseFloat(document.getElementById('precio').value) || 0;
  const descuento = parseFloat(document.getElementById('descuento').value) || 0;
  const impuestos = parseFloat(document.getElementById('impuestos').value) || 0;

  const subtotal = cantidad * precio;
  const total = subtotal - descuento + impuestos;

  document.getElementById('total').value = total.toFixed(2);
}

function exportar() {
  alert("✅ Comprobante exportado correctamente.");
}

function enviarCorreo() {
  const correo = document.getElementById('correo').value;
  if (correo.trim() === '') {
    alert("⚠️ Ingresa un correo válido para enviar.");
  } else {
    alert(`✉️ Correo enviado a: ${correo}`);
  }
}

function cancelar() {
  if (confirm("¿Seguro que deseas cancelar el registro?")) {
    document.querySelector('form')?.reset();
    location.reload();
  }
}
