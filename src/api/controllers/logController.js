const LogService = require("../services/logService");

class LogController {
  static async getLogsByDate(req, res) {
    const { date } = req.params;
    const logs = LogService.getLogsByDate(date);

    if (logs === null) {
      return res.status(400).json({ message: "Formato de data inválido. Use YYYY-MM-DD." });
    }

    if (logs.length > 0) {
      res.status(200).json(logs);
    } else {
      res.status(404).json({ message: "Nenhum log encontrado para a data especificada." });
    }
  }

  static async getAllLogs(req, res) {
    const logs = LogService.getAllLogs();
    res.status(200).json(logs);
  }
}

module.exports = LogController;
