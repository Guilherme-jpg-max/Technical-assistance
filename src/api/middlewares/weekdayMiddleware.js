const { DateTime } = require("luxon");

const weekdayMiddleware = (req, res, next) => {
  // const now = DateTime.now().setZone("America/fortaleza");
  // const dayOfWeek = now.weekday; // 1 = Segunda, 7 = Domingo

  // // Verifica se é sábado (6) ou domingo 
  // if (dayOfWeek === 6 || dayOfWeek === 7) {
  //   return res.status(403).json({ message: "Acesso a API permitido apenas de segunda a sexta-feira." });
  // }

  next();
};

module.exports = weekdayMiddleware;