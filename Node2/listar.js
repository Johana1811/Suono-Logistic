const express = require('express');
require('./conexion');
const Usuario = require('./modeloUsuario');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

// Ruta raíz redirige al formulario de registro
app.get('/', (req, res) => {
  res.redirect('/insertar');
});

// Ruta opcional para ver la lista de usuarios manualmente
app.get('/usuarios', async (req, res) => {
  try {
    const resultados = await Usuario.find();

    let tabla = `
    <html>
    <head>
        <title>Usuarios</title>
        <link rel="stylesheet" href="/estilos.css">
    </head>
    <body>
    <h1>Lista de Usuarios</h1>
    <a href="/insertar">Agregar Usuario</a> |
    <a href="/login">Iniciar Sesión</a>
    <table border="1">
      <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Acciones</th></tr>
    `;

    resultados.forEach(usuario => {
      tabla += `
        <tr>
          <td>${usuario._id}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.email}</td>
          <td>
            <a href="/modificar/${usuario._id}">Editar</a> |
            <a href="/eliminar/${usuario._id}" onclick="return confirm('¿Estás seguro de eliminar este usuario?');">Eliminar</a>
          </td>
        </tr>
      `;
    });

    tabla += `</table></body></html>`;
    res.send(tabla);
  } catch (err) {
    res.send('Error al consultar la base de datos: ' + err.message);
  }
});

// Rutas
app.use('/insertar', require('./insertar'));
app.use('/modificar', require('./modificar'));
app.use('/eliminar', require('./eliminar'));
app.use('/login', require('./login'));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
