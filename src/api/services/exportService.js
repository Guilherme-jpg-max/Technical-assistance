const { Parser } = require('json2csv');
const EntradaAparelho = require('../../models/EntradaAparelho');

class ExportService {
  static async getExportData() {
    return EntradaAparelho.aggregate([
      {
        $lookup: {
          from: 'orcamentos',
          localField: '_id',
          foreignField: 'fk_id_entrada',
          as: 'orcamentos',
        },
      },
      {
        $unwind: {
          path: '$orcamentos',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          codigo: 1,
          nome_atendente: 1,
          nome_cliente: 1,
          numero_cliente: 1,
          modelo_aparelho: 1,
          marca_aparelho: 1,
          descricao_problema: 1,
          status: 1,
          data_entrada: 1,
          data_previsao: 1,
          data_entrega: 1,
          orcamento_id: '$orcamentos._id',
          descricao_servico: '$orcamentos.descricao_servico',
          valor_orcamento: '$orcamentos.valor_orcamento',
          aprovado: '$orcamentos.aprovado',
          observacoes: '$orcamentos.observacoes',
        },
      },
    ]);
  }

  static async generateCsv(data) {
    const fields = [
      'codigo',
      'nome_atendente',
      'nome_cliente',
      'numero_cliente',
      'modelo_aparelho',
      'marca_aparelho',
      'descricao_problema',
      'status',
      'data_entrada',
      'data_previsao',
      'data_entrega',
      'orcamento_id',
      'descricao_servico',
      'valor_orcamento',
      'aprovado',
      'observacoes',
    ];

    const parser = new Parser({ fields, defaultValue: '' });
    return parser.parse(data);
  }
}

module.exports = ExportService;
