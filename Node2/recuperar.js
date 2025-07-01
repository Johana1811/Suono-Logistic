const express = require('express');
const router = express.Router();
const Usuario = require('./modeloUsuario');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.send(`
    <html>
    <head><title>Recuperar Contraseña</title><link rel="stylesheet" href="/public/estilos.css"></head>
    <body>
      <div class="container">
        <div class="left-section"><div class="image-placeholder"></div></div>
        <div class="right-section">
          <h2>Recuperar contraseña</h2>
          <form action="/recuperar" method="POST">
            <label>Correo registrado</label>
            <input type="email" name="email" required>
            <button type="submit">Enviar correo</button>
          </form>
          <p class="center-text"><a href="/login">Volver al login</a></p>
        </div>
      </div>
    </body>
    </html>
  `);
});

router.post('/', async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    return res.send('<p>Correo no registrado.</p><a href="/recuperar">Intentar de nuevo</a>');
  }

  const link = `http://localhost:3000/recuperar/reset/${usuario._id}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tucorreo@gmail.com',
      pass: 'tu_contraseña_de_aplicacion'
    }
  });

  const opciones = {
    from: 'tucorreo@gmail.com',
    to: usuario.email,
    subject: 'Restablecer contraseña',
    html: `<p>Hola ${usuario.nombre},</p>
           <p>Haz clic para restablecer tu contraseña:</p>
           <a href="${link}">${link}</a>`
  };

  try {
    await transporter.sendMail(opciones);
    res.send('<p>📬 Correo enviado. Revisa tu bandeja.</p><a href="/login">Volver</a>');
  } catch (error) {
    console.error(error);
    res.send('<p>Error al enviar correo.</p><a href="/login">Volver</a>');
  }
});

router.get('/reset/:id', async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findById(id);

  if (!usuario) return res.send('<p>Usuario no encontrado</p><a href="/login">Volver</a>');

  res.send(`
    <html>
    <head><title>Restablecer contraseña</title><link rel="stylesheet" href="/public/estilos.css"></head>
    <body>
      <div class="container">
        <div class="left-section"><div class="image-placeholder"></div></div>
        <div class="right-section">
          <h2>Restablecer contraseña</h2>
          <form action="/recuperar/reset/${id}" method="POST">
            <label>Nueva contraseña</label>
            <input type="password" name="password" required minlength="7">
            <label>Confirmar contraseña</label>
            <input type="password" name="confirmar" required minlength="7">
            <button type="submit">Actualizar</button>
          </form>
        </div>
      </div>
    </body>
    </html>
  `);
});

router.post('/reset/:id', async (req, res) => {
  const { id } = req.params;
  const { password, confirmar } = req.body;

  if (password !== confirmar) {
    return res.send('<p>Las contraseñas no coinciden.</p><a href="/login">Volver</a>');
  }

  const hashed = await bcrypt.hash(password, 10);
  await Usuario.findByIdAndUpdate(id, { password: hashed });

  res.send('<p>✅ Contraseña actualizada correctamente.</p><a href="/login">Ir al login</a>');
});

module.exports = router;
