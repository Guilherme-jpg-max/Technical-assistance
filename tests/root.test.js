const { request, app } = require('./testHelper');

describe('Root and Swagger routes', () => {
  test('GET / deve responder 200 com mensagem de status', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'API de Assistência Técnica funcionando!' });
  });

  test('GET /api-docs/ deve carregar a documentação Swagger', async () => {
    const response = await request(app).get('/api-docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Swagger');
  });
});
