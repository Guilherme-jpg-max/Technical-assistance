const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const hashedPassword = bcrypt.hashSync('123456', 10);

const atendentes = [
  {
    _id: uuidv4(),
    nome: 'João Silva',
    telefone: '11987654321',
    ativo: true,
    email: 'joao@assistencia.com',
    senha: hashedPassword,
  },
  {
    _id: uuidv4(),
    nome: 'Maria Souza',
    telefone: '11912345678',
    ativo: true,
    email: 'maria@assistencia.com',
    senha: hashedPassword,
  },
  {
    _id: uuidv4(),
    nome: 'Carlos Ferreira',
    telefone: '11998765432',
    ativo: false,
    email: 'carlos@assistencia.com',
    senha: hashedPassword,
  },
];

const entradaAparelhos = [
  {
    _id: uuidv4(),
    nome_atendente: 'João Silva',
    nome_cliente: 'Ana Paula',
    numero_cliente: '11987654321',
    modelo_aparelho: 'iPhone 12 Pro',
    marca_aparelho: 'Apple',
    descricao_problema: 'Tela trincada e bateria viciada',
    status: 'aguardando_orcamento',
    data_entrada: new Date('2024-03-01T10:00:00Z'),
    data_previsao: null,
    data_entrega: null,
  },
  {
    _id: uuidv4(),
    nome_atendente: 'Maria Souza',
    nome_cliente: 'Bruno Costa',
    numero_cliente: '11912345678',
    modelo_aparelho: 'Samsung Galaxy S21',
    marca_aparelho: 'Samsung',
    descricao_problema: 'Não liga, possivelmente placa-mãe',
    status: 'orcamento_enviado',
    data_entrada: new Date('2024-03-05T14:30:00Z'),
    data_previsao: null,
    data_entrega: null,
  },
  {
    _id: uuidv4(),
    nome_atendente: 'João Silva',
    nome_cliente: 'Carla Dias',
    numero_aparelho: '11998765432',
    modelo_aparelho: 'Xiaomi Redmi Note 10',
    marca_aparelho: 'Xiaomi',
    descricao_problema: 'Problema no conector de carga',
    status: 'aprovado',
    data_entrada: new Date('2024-03-08T09:15:00Z'),
    data_previsao: new Date('2024-03-15T17:00:00Z'),
    data_entrega: null,
  },
];

const orcamentos = [
  {
    _id: uuidv4(),
    fk_id_entrada: entradaAparelhos[1]._id,
    nome_atendente: 'Maria Souza',
    descricao_servico: 'Troca de placa-mãe e verificação de componentes',
    valor_orcamento: 850.00,
    aprovado: false,
    data_orcamento: new Date('2024-03-06T11:00:00Z'),
    observacoes: 'Peça importada, prazo de 10 dias úteis para chegada.',
  },
  {
    _id: uuidv4(),
    fk_id_entrada: entradaAparelhos[2]._id,
    nome_atendente: 'João Silva',
    descricao_servico: 'Troca do conector de carga',
    valor_orcamento: 180.00,
    aprovado: true,
    data_orcamento: new Date('2024-03-09T10:00:00Z'),
    observacoes: null,
  },
];

const logs = [];

module.exports = {
  atendentes,
  entradaAparelhos,
  orcamentos,
  logs,
};
