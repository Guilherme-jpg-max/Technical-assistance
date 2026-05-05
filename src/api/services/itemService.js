const EntradaAparelho = require('../../models/EntradaAparelho');
const Orcamento = require('../../models/Orcamento');

class ItemService {

  static getAllEntradaAparelhos() {
    return EntradaAparelho.find().sort({ createdAt: -1 });
  }

  static getEntradaAparelhoById(id) {
    return EntradaAparelho.findById(id);
  }

  static createEntradaAparelho(data) {
    const novo = new EntradaAparelho({
      nome_atendente:     data.nome_atendente,
      nome_cliente:       data.nome_cliente,
      numero_cliente:     data.numero_cliente,
      modelo_aparelho:    data.modelo_aparelho,
      marca_aparelho:     data.marca_aparelho,
      descricao_problema: data.descricao_problema,
      imageUrl:           data.imageUrl || null,
      status:             data.status || 'aguardando_orcamento',
      data_previsao:      data.data_previsao || null,
      data_entrega:       data.data_entrega || null,
    });
    return novo.save();
  }

  static updateEntradaAparelho(id, data) {
    return EntradaAparelho.findByIdAndUpdate(id, data, { new: true });
  }

  static deleteEntradaAparelho(id) {
    return EntradaAparelho.findByIdAndDelete(id);
  }

  static searchEntradaAparelhoByCodigo(id) {
    return EntradaAparelho.findById(id);
  }

  static getAllOrcamentos() {
    return Orcamento.find().populate('fk_id_entrada').sort({ createdAt: -1 });
  }

  static getOrcamentoById(id) {
    return Orcamento.findById(id).populate('fk_id_entrada');
  }

  static createOrcamento(data) {
    const novo = new Orcamento({
      fk_id_entrada:     data.fk_id_entrada,
      nome_atendente:    data.nome_atendente,
      descricao_servico: data.descricao_servico,
      valor_orcamento:   data.valor_orcamento,
      aprovado:          data.aprovado || false,
      observacoes:       data.observacoes || null,
    });
    return novo.save();
  }

  static updateOrcamento(id, data) {
    return Orcamento.findByIdAndUpdate(id, data, { new: true });
  }

  static deleteOrcamento(id) {
    return Orcamento.findByIdAndDelete(id);
  }
}

module.exports = ItemService;