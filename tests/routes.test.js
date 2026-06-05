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

describe('Rotas da API', () => {
  test('GET / deve responder 200 com mensagem de status', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'API de Assistência Técnica funcionando!' });
  });

  test('GET /api-docs/ deve carregar a documentação', async () => {
    const response = await request(app).get('/api-docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Swagger');
  });

  describe('Autenticação', () => {
    test('POST /api/auth/logar deve chamar AuthController.login', async () => {
      const response = await request(app)
        .post('/api/auth/logar')
        .send({ email: 'test@example.com', senha: '123456' });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'login successful' });
    });

    test('POST /api/auth/verificar-2fa deve chamar AuthController.verificar2FA', async () => {
      const response = await request(app)
        .post('/api/auth/verificar-2fa')
        .send({ email: 'test@example.com', codigo: '123456' });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ token: 'valid-token' });
    });
  });

  describe('Proteção JWT', () => {
    test('GET /api/entrada-aparelhos sem token retorna 401', async () => {
      const response = await request(app).get('/api/entrada-aparelhos');
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Token não fornecido.');
    });

    test('GET /api/entrada-aparelhos com token inválido retorna 403', async () => {
      const response = await request(app)
        .get('/api/entrada-aparelhos')
        .set('Authorization', 'Bearer invalid-token');
      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty('message', 'Token inválido ou expirado.');
    });
  });

  describe('Entrada de Aparelhos', () => {
    test('GET /api/entrada-aparelhos retorna 200', async () => {
      const response = await request(app)
        .get('/api/entrada-aparelhos')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ id: '1' }]);
    });

    test('GET /api/entrada-aparelhos/search/:codigo retorna 200', async () => {
      const response = await request(app)
        .get('/api/entrada-aparelhos/search/AP001')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ codigo: 'AP001' });
    });

    test('GET /api/entrada-aparelhos/pdf/download retorna PDF', async () => {
      const response = await request(app)
        .get('/api/entrada-aparelhos/pdf/download')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
      expect(response.text).toContain('PDF content');
    });

    test('GET /api/entrada-aparelhos/:id retorna 200', async () => {
      const response = await request(app)
        .get('/api/entrada-aparelhos/1')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: '1' });
    });

    test('POST /api/entrada-aparelhos retorna 201', async () => {
      const response = await request(app)
        .post('/api/entrada-aparelhos')
        .set('Authorization', `Bearer ${validToken}`)
        .field('nome_atendente', 'João')
        .field('nome_cliente', 'Cliente Teste')
        .field('numero_cliente', '11999998888')
        .field('modelo_aparelho', 'Modelo X')
        .field('marca_aparelho', 'Marca Y')
        .field('descricao_problema', 'Teste');
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ created: true });
    });

    test('PUT /api/entrada-aparelhos/:id retorna 200', async () => {
      const response = await request(app)
        .put('/api/entrada-aparelhos/1')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ status: 'em_reparo' });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ updated: true });
    });

    test('DELETE /api/entrada-aparelhos/:id retorna 204', async () => {
      const response = await request(app)
        .delete('/api/entrada-aparelhos/1')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(204);
    });
  });

  describe('Orçamentos', () => {
    test('GET /api/orcamentos retorna 200', async () => {
      const response = await request(app)
        .get('/api/orcamentos')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ id: '1' }]);
    });

    test('GET /api/orcamentos/:id retorna 200', async () => {
      const response = await request(app)
        .get('/api/orcamentos/1')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ id: '1' });
    });

    test('POST /api/orcamentos retorna 201', async () => {
      const response = await request(app)
        .post('/api/orcamentos')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ fk_id_entrada: '1', nome_atendente: 'Teste', descricao_servico: 'Troca', valor_orcamento: 100 });
      expect(response.status).toBe(201);
      expect(response.body).toEqual({ created: true });
    });

    test('PUT /api/orcamentos/:id retorna 200', async () => {
      const response = await request(app)
        .put('/api/orcamentos/1')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ aprovado: true });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ updated: true });
    });

    test('DELETE /api/orcamentos/:id retorna 204', async () => {
      const response = await request(app)
        .delete('/api/orcamentos/1')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(204);
    });
  });

  describe('Logs', () => {
    test('GET /api/logs retorna 200', async () => {
      const response = await request(app)
        .get('/api/logs')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ rota: '/api/logs' }]);
    });

    test('GET /api/logs/:date retorna 200', async () => {
      const response = await request(app)
        .get('/api/logs/2025-01-01')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ date: '2025-01-01' }]);
    });
  });

  describe('Export e relatório', () => {
    test('GET /api/export/csv retorna CSV', async () => {
      const response = await request(app)
        .get('/api/export/csv')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('text/csv');
      expect(response.text).toContain('id,codigo');
    });

    test('GET /api/relatorio/monitoramento retorna PDF', async () => {
      const response = await request(app)
        .get('/api/relatorio/monitoramento')
        .set('Authorization', `Bearer ${validToken}`);
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/pdf');
      expect(response.body).toBeInstanceOf(Buffer);
    });
  });
});
