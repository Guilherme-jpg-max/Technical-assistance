process.env.JWT_SECRET = 'secretKey';

jest.mock('../src/models/logAcessoModel', () => ({
  create: jest.fn(),
}));

jest.mock('../src/api/controllers/authController', () => ({
  login: jest.fn((req, res) => res.status(200).json({ message: 'login successful' })),
  verificar2FA: jest.fn((req, res) => res.status(200).json({ token: 'valid-token' })),
}));

jest.mock('../src/api/controllers/itemController', () => ({
  getAllEntradaAparelhos: jest.fn((req, res) => res.status(200).json([{ id: '1' }])),
  searchEntradaAparelhoByCodigo: jest.fn((req, res) => res.status(200).json({ codigo: req.params.codigo })),
  generateEntradaAparelhosPdf: jest.fn((req, res) => res.status(200).send('PDF content')),
  getEntradaAparelhoById: jest.fn((req, res) => res.status(200).json({ id: req.params.id })),
  createEntradaAparelho: jest.fn((req, res) => res.status(201).json({ created: true })),
  updateEntradaAparelho: jest.fn((req, res) => res.status(200).json({ updated: true })),
  deleteEntradaAparelho: jest.fn((req, res) => res.status(204).send()),
  getAllOrcamentos: jest.fn((req, res) => res.status(200).json([{ id: '1' }])),
  getOrcamentoById: jest.fn((req, res) => res.status(200).json({ id: req.params.id })),
  createOrcamento: jest.fn((req, res) => res.status(201).json({ created: true })),
  updateOrcamento: jest.fn((req, res) => res.status(200).json({ updated: true })),
  deleteOrcamento: jest.fn((req, res) => res.status(204).send()),
}));

jest.mock('../src/api/controllers/logController', () => ({
  getAllLogs: jest.fn((req, res) => res.status(200).json([{ rota: '/api/logs' }])),
  getLogsByDate: jest.fn((req, res) => res.status(200).json([{ date: req.params.date }])),
}));

jest.mock('../src/api/controllers/exportController', () => ({
  downloadCsv: jest.fn((req, res) => res.header('Content-Type', 'text/csv').send('id,codigo\n1,AP001')),
}));

jest.mock('../src/api/controllers/monitoramentoController', () => ({
  generateMonthlyReport: jest.fn((req, res) => res.header('Content-Type', 'application/pdf').send(Buffer.from('%PDF-1.4'))),
}));

const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');

const validToken = jwt.sign({ id: 'test', email: 'test@example.com' }, process.env.JWT_SECRET);

module.exports = {
  request,
  app,
  validToken,
};
