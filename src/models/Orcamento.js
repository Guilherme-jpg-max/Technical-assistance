const mongoose = require('mongoose');

const orcamentoSchema = new mongoose.Schema({
  fk_id_entrada:     { type: mongoose.Schema.Types.ObjectId, ref: 'EntradaAparelho', required: true },
  nome_atendente:    { type: String, required: true },
  descricao_servico: { type: String, required: true },
  valor_orcamento:   { type: Number, required: true },
  aprovado:          { type: Boolean, default: false },
  data_orcamento:    { type: Date, default: Date.now },
  observacoes:       { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Orcamento', orcamentoSchema);