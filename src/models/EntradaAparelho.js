const mongoose = require('mongoose');

const entradaAparelhoSchema = new mongoose.Schema({
  nome_atendente:    { type: String, required: true },
  nome_cliente:      { type: String, required: true },
  numero_cliente:    { type: String, required: true },
  modelo_aparelho:   { type: String, required: true },
  marca_aparelho:    { type: String, required: true },
  descricao_problema:{ type: String, required: true },
  imageUrl:          { type: String, default: null },
  status: {
    type: String,
    enum: ['aguardando_orcamento','orcamento_enviado','aprovado','em_reparo','pronto','entregue','cancelado'],
    default: 'aguardando_orcamento',
  },
  data_entrada:  { type: Date, default: Date.now },
  data_previsao: { type: Date, default: null },
  data_entrega:  { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('EntradaAparelho', entradaAparelhoSchema);