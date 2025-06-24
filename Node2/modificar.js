const express = require('express');
const router = express.Router();
const Usuario = require('./modeloUsuario');

router.use(express.urlencoded({ extended: true }));

router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.send('Usuario no encontrado');

    const html = `
    <html>
    <head><title>Modificar</title><link rel="stylesheet" href="/estilos.css"></head>
    <body>
      <h3>Modificar Usuario</h3>
      <form action="/modificar/${usuario._id}" method="POST">
          <label>Nombre:</label><br>
          <input type="text" name="nombre" value="${usuario.nombre}" required><br>
          <label>Email:</label><br>
          <input type="email" name="email" value="${usuario.email}" required><br>
          <button type="submit">Guardar Cambios</button>
      </form>
      <a href="/">Volver a la lista</a>
    </body>
    </html>
    `;
    res.send(html);
  } catch (err) {
    res.send('Error: ' + err.message);
  }
});

router.post('/:id', async (req, res) => {
  try {
    const { nombre, email } = req.body;
    await Usuario.findByIdAndUpdate(req.params.id, { nombre, email });
    res.send(`<p>Usuario actualizado correctamente.</p><a href="/">Ver lista</a>`);
  } catch (err) {
    res.send('Error al modificar: ' + err.message);
  }
});

module.exports = router;