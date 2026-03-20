class Atendente {
  constructor(_id, nome, telefone, ativo, email, senha) {
    this._id = _id;
    this.nome = nome;
    this.telefone = telefone;
    this.ativo = ativo;
    this.email = email;
    this.senha = senha;
  }
}

class EntradaAparelho {
  constructor(_id, nome_atendente, nome_cliente, numero_cliente, modelo_aparelho, marca_aparelho, descricao_problema, status, data_entrada, data_previsao, data_entrega) {
    this._id = _id;
    this.nome_atendente = nome_atendente;
    this.nome_cliente = nome_cliente;
    this.numero_cliente = numero_cliente;
    this.modelo_aparelho = modelo_aparelho;
    this.marca_aparelho = marca_aparelho;
    this.descricao_problema = descricao_problema;
    this.status = status; // enum: ["aguardando_orcamento", "orcamento_enviado", "aprovado", "em_reparo", "pronto", "entregue", "cancelado"]
    this.data_entrada = data_entrada;
    this.data_previsao = data_previsao;
    this.data_entrega = data_entrega;
  }
}

class Orcamento {
  constructor(_id, fk_id_entrada, nome_atendente, descricao_servico, valor_orcamento, aprovado, data_orcamento, observacoes) {
    this._id = _id;
    this.fk_id_entrada = fk_id_entrada;
    this.nome_atendente = nome_atendente;
    this.descricao_servico = descricao_servico;
    this.valor_orcamento = valor_orcamento;
    this.aprovado = aprovado;
    this.data_orcamento = data_orcamento;
    this.observacoes = observacoes;
  }
}

class Log {
  constructor(_id, timestamp, rota, metodo, ip, userAgent) {
    this._id = _id;
    this.timestamp = timestamp;
    this.rota = rota;
    this.metodo = metodo;
    this.ip = ip;
    this.userAgent = userAgent;
  }
}

module.exports = {
  Atendente,
  EntradaAparelho,
  Orcamento,
  Log,
};
