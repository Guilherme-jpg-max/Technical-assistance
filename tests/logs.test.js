const { request, app, validToken } = require('./testHelper');

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
