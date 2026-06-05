const ExportService = require('../services/exportService');

class ExportController {
  static async downloadCsv(req, res) {
    try {
      const data = await ExportService.getExportData();
      const csv = await ExportService.generateCsv(data);

      res.header('Content-Type', 'text/csv');
      res.attachment('export-aparelhos-orcamentos.csv');
      res.send(csv);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao exportar CSV.', error: err.message });
    }
  }
}

module.exports = ExportController;
