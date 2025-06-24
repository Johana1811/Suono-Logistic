const express = require('express');
const router = express.Router();
const Usuario = require('./modeloUsuario');

router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Registro</title>
      <link rel="stylesheet" href="/estilos.css">
    </head>
    <body>
      <div class="container">
        <div class="left-section">
          <div class="image-placeholder"></div>
        </div>
        <div class="right-section">
          <h2>Crear cuenta</h2>
          <form action="/insertar" method="POST">
              <label>Nombre</label>
              <input type="text" name="nombre" placeholder="Introduce tu nombre" required>

              <label>Teléfono</label>
              <input type="tel" name="telefono" placeholder="+57 300 0000000" required>

              <label>Email</label>
              <input type="email" name="email" placeholder="mi@ejemplo.com" required>

              <label>Contraseña</label>
              <input type="password" name="password" placeholder="Introduce tu contraseña" required>

              <label>Confirmar contraseña</label>
              <input type="password" name="confirmar_password" placeholder="Confirma tu contraseña" required>

              <button type="submit">Registrarse</button>
          </form>
          <p class="center-text">¿Ya tienes cuenta? <a href="/login">Iniciar sesión</a>.</p>
        </div>
      </div>
    </body>
    </html>
  `);
});

router.post('/', async (req, res) => {
  const { nombre, telefono, email, password, confirmar_password } = req.body;

  if (password !== confirmar_password) {
    return res.send('<p>Las contraseñas no coinciden.</p><a href="/insertar">Intentar de nuevo</a>');
  }

  try {
    await Usuario.create({ nombre, telefono, email, password });
    res.send(`<p>Usuario registrado correctamente.</p><a href="/insertar">Agregar otro</a> | <a href="/login">Iniciar sesión</a>`);
  } catch (err) {
    res.send('Error al insertar: ' + err.message);
  }
});

module.exports = router;
