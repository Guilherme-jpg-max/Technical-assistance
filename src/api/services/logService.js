const { logs } = require("../../data/mockData");
const { DateTime } = require("luxon");

class LogService {
  static getLogsByDate(dateString) {
    const targetDate = DateTime.fromISO(dateString, { zone: "America/Sao_Paulo" });

    if (!targetDate.isValid) {
      return null;
    }

    return logs.filter(log => {
      const logDate = DateTime.fromJSDate(log.timestamp, { zone: "America/Sao_Paulo" });
      return logDate.hasSame(targetDate, "day");
    });
  }

  static getAllLogs() {
    return logs;
  }
}

module.exports = LogService;
