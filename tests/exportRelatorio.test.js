const { request, app, validToken } = require('./testHelper');

describe('Exportação e relatório', () => {
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
