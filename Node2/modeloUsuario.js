const mongoose = require('mongoose');
require('./conexion');

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  telefono: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
