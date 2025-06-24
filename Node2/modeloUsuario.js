const mongoose = require('mongoose');
require('./conexion');

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  password: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);