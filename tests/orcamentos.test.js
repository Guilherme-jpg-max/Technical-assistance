const { request, app, validToken } = require('./testHelper');

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
