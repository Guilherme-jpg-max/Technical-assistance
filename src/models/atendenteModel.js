const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const atendenteSchema = new mongoose.Schema({
  nome:     String,
  email:    { type: String, unique: true },
  senha:    String,
  telefone: String,
  ativo:    { type: Boolean, default: true },
});

atendenteSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

atendenteSchema.methods.verificarSenha = function (senha) {
  return bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model('Atendente', atendenteSchema);