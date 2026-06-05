const { request, app, validToken } = require('./testHelper');

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
