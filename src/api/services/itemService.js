const { entradaAparelhos, orcamentos } = require("../../data/mockData");
const { v4: uuidv4 } = require("uuid");

class ItemService {
  static getAllEntradaAparelhos() {
    return entradaAparelhos;
  }

  static getEntradaAparelhoById(id) {
    return entradaAparelhos.find(item => item._id === id);
  }

  static createEntradaAparelho(data) {
    const newItem = {
      _id: uuidv4(),
      nome_atendente: data.nome_atendente,
      nome_cliente: data.nome_cliente,
      numero_cliente: data.numero_cliente,
      modelo_aparelho: data.modelo_aparelho,
      marca_aparelho: data.marca_aparelho,
      descricao_problema: data.descricao_problema,
      status: "aguardando_orcamento",
      data_entrada: new Date(),
      data_previsao: data.data_previsao || null,
      data_entrega: null,
    };
    entradaAparelhos.push(newItem);
    return newItem;
  }

  static updateEntradaAparelho(id, data) {
    const index = entradaAparelhos.findIndex(item => item._id === id);
    if (index !== -1) {
      entradaAparelhos[index] = { ...entradaAparelhos[index], ...data };
      return entradaAparelhos[index];
    }
    return null;
  }

  static deleteEntradaAparelho(id) {
    const initialLength = entradaAparelhos.length;
    entradaAparelhos = entradaAparelhos.filter(item => item._id !== id);
    return entradaAparelhos.length < initialLength;
  }

  static searchEntradaAparelhoByCodigo(codigo) {
    // Para o mock considerei o _id como o "código"
    return entradaAparelhos.find(item => item._id === codigo);
  }

  static getAllOrcamentos() {
    return orcamentos;
  }

  static getOrcamentoById(id) {
    return orcamentos.find(item => item._id === id);
  }

  static createOrcamento(data) {
    const newOrcamento = {
      _id: uuidv4(),
      fk_id_entrada: data.fk_id_entrada,
      nome_atendente: data.nome_atendente,
      descricao_servico: data.descricao_servico,
      valor_orcamento: data.valor_orcamento,
      aprovado: data.aprovado || false,
      data_orcamento: new Date(),
      observacoes: data.observacoes || null,
    };
    orcamentos.push(newOrcamento);
    return newOrcamento;
  }

  static updateOrcamento(id, data) {
    const index = orcamentos.findIndex(item => item._id === id);
    if (index !== -1) {
      orcamentos[index] = { ...orcamentos[index], ...data };
      return orcamentos[index];
    }
    return null;
  }

  static deleteOrcamento(id) {
    const initialLength = orcamentos.length;
    orcamentos = orcamentos.filter(item => item._id !== id);
    return orcamentos.length < initialLength;
  }
}

module.exports = ItemService;
