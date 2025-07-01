const express = require('express');
const path = require('path');
require('./conexion');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/portal', express.static(path.join(__dirname, 'portal')));
app.use('/paneladmi', express.static(path.join(__dirname, 'paneladmi')));

// Redirección a la página de inicio del portal
app.get('/', (req, res) => {
  res.redirect('/portal/inicio.html');
});

// Ruta para listar usuarios (la dejo intacta por si la usás en el futuro)
const Usuario = require('./modeloUsuario');
app.get('/usuarios', async (req, res) => {
  try {
    const resultados = await Usuario.find();

    let tabla = `
    <html>
    <head>
        <title>Usuarios</title>
        <link rel="stylesheet" href="/public/estilos.css">
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
            <!-- En el futuro puedes agregar editar/eliminar aquí -->
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

// Rutas activas
app.use('/insertar', require('./insertar'));
app.use('/login', require('./login'));
app.use('/recuperar', require('./recuperar'));

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
