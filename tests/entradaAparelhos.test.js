const { request, app, validToken } = require('./testHelper');

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
