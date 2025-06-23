document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  const userData = { name, phone, email, password };

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const result = await response.json();
    if (response.ok) {
      alert('Registro exitoso.');
    } else {
      alert(result.message || 'Error al registrar el usuario.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error de conexión con el servidor.');
  }
});
