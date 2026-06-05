const LogAcesso = require('../../models/logAcessoModel');

const accessLogMiddleware = async (req, res, next) => {
  try {
    await LogAcesso.create({
      rota: req.originalUrl,
      metodo: req.method,
      timestamp: new Date(),
    });
  } catch (err) {
    console.error('Erro ao salvar log de acesso:', err.message);
  }

  next();
};

module.exports = accessLogMiddleware;
