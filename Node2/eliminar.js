const express = require('express');
const router = express.Router();
const Usuario = require('./modeloUsuario');

router.get('/:id', async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.send(`
      <html>
      <head><title>Usuarios</title><link rel="stylesheet" href="/estilos.css"></head>
      <body>
        <p>Usuario eliminado correctamente.</p>
        <a href="/">Volver a la lista</a>
      </body>
      </html>
    `);
  } catch (err) {
    res.send('Error al eliminar: ' + err.message);
  }
});

module.exports = router;