const { v4: uuidv4 } = require("uuid");
const { logs } = require("../../data/mockData");

const logMiddleware = (req, res, next) => {
  const logEntry = {
    _id: uuidv4(),
    timestamp: new Date(),
    rota: req.originalUrl,
    metodo: req.method,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  };
  logs.push(logEntry);
  console.log(`[LOG] ${logEntry.metodo} ${logEntry.rota} - ${logEntry.timestamp}`);
  next();
};

module.exports = logMiddleware;