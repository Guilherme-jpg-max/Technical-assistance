const request = require('supertest');
const app = require('../src/app');

describe('API de Assistência Técnica', () => {
  test('GET / deve responder 200 com mensagem de status', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'API de Assistência Técnica funcionando!' });
  });

  test('GET /api/entrada-aparelhos sem token retorna 401', async () => {
    const response = await request(app).get('/api/entrada-aparelhos');
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Token não fornecido.');
  });

  test('GET /api/entrada-aparelhos/search/:codigo sem token retorna 401', async () => {
    const response = await request(app).get('/api/entrada-aparelhos/search/AP001');
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Token não fornecido.');
  });

  test('GET /api/orcamentos sem token retorna 401', async () => {
    const response = await request(app).get('/api/orcamentos');
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Token não fornecido.');
  });

  test('GET /api/logs sem token retorna 401', async () => {
    const response = await request(app).get('/api/logs');
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Token não fornecido.');
  });

  test('GET /api/entrada-aparelhos com token inválido retorna 403', async () => {
    const response = await request(app)
      .get('/api/entrada-aparelhos')
      .set('Authorization', 'Bearer token-invalido');

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message', 'Token inválido ou expirado.');
  });

  test('GET /api-docs deve carregar a documentação Swagger', async () => {
    const response = await request(app).get('/api-docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Swagger');
  });
});
