const mongoose = require('mongoose');

const logAcessoSchema = new mongoose.Schema({
  rota: { type: String, required: true },
  metodo: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
}, { collection: 'logs_acesso' });

module.exports = mongoose.model('LogAcesso', logAcessoSchema);
