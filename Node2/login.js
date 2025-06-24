const express = require('express');
const router = express.Router();
const Usuario = require('./modeloUsuario');

router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Iniciar Sesión</title>
      <link rel="stylesheet" href="/estilos.css">
    </head>
    <body>
      <div class="container">
        <div class="left-section">
          <div class="image-placeholder"></div>
        </div>
        <div class="right-section">
          <h2>Iniciar sesión</h2>
          <form action="/login" method="POST">
              <label>Correo electrónico</label>
              <input type="email" name="email" placeholder="ejemplo@correo.com" required>

              <label>Contraseña</label>
              <input type="password" name="password" placeholder="********" required>

              <button type="submit">Entrar</button>
          </form>
          <p class="center-text"><a href="#">¿Olvidaste tu contraseña?</a></p>
        </div>
      </div>
    </body>
    </html>
  `);
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.send('<p>Usuario no encontrado</p><a href="/login">Intentar de nuevo</a>');
    }

    if (usuario.password !== password) {
      return res.send('<p>Contraseña incorrecta</p><a href="/login">Intentar de nuevo</a>');
    }

    res.send(`<p>Bienvenido, ${usuario.nombre}!</p><a href="/">Ir al inicio</a>`);
  } catch (err) {
    res.send('Error: ' + err.message);
  }
});

module.exports = router;
