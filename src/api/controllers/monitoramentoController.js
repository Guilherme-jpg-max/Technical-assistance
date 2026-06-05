const PDFDocument = require('pdfkit');
const { DateTime } = require('luxon');
const LogAcesso = require('../../models/logAcessoModel');

class MonitoramentoController {
  static async generateMonthlyReport(req, res) {
    try {
      const now = DateTime.now().setZone('America/Sao_Paulo');
      const start = now.startOf('month').toJSDate();
      const end = now.endOf('month').toJSDate();

      const registros = await LogAcesso.find({ timestamp: { $gte: start, $lte: end } }).lean();

      const agrupamento = registros.reduce((acc, log) => {
        const rota = log.rota;
        const hora = DateTime.fromJSDate(log.timestamp, { zone: 'America/Sao_Paulo' }).hour;
        acc.routes[rota] = (acc.routes[rota] || 0) + 1;
        acc.hours[hora] = (acc.hours[hora] || 0) + 1;
        return acc;
      }, { routes: {}, hours: {} });

      const routeStats = Object.entries(agrupamento.routes).map(([rota, count]) => ({ rota, count })).sort((a, b) => b.count - a.count);
      const peakHourEntry = Object.entries(agrupamento.hours).sort((a, b) => b[1] - a[1])[0] || ['N/A', 0];
      const peakHour = peakHourEntry[0];
      const peakCount = peakHourEntry[1];

      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=relatorio-monitoramento.pdf');
      doc.pipe(res);

      doc.fontSize(18).text('Relatório de Monitoramento de Acessos', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Período: ${now.toFormat('LLLL yyyy')}`);
      doc.moveDown();

      doc.fontSize(14).text('Resumo de Acessos por Rota', { underline: true });
      doc.moveDown(0.5);

      const tableTop = doc.y;
      doc.font('Helvetica-Bold').text('Rota', 50, tableTop);
      doc.text('Contagem', 380, tableTop);
      doc.moveDown(0.5);
      doc.font('Helvetica');

      routeStats.forEach((item) => {
        doc.text(item.rota, 50, doc.y, { width: 320 });
        doc.text(String(item.count), 380, doc.y);
        doc.moveDown(0.5);
      });

      if (routeStats.length === 0) {
        doc.text('Nenhum acesso registrado no período.', 50, doc.y);
        doc.moveDown();
      }

      doc.moveDown();
      doc.fontSize(14).text('Hora de Pico', { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(12).text(`Hora com mais acessos: ${peakHour === 'N/A' ? 'Nenhum' : `${peakHour}:00`} (${peakCount} acessos)`);

      doc.end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao gerar relatório de monitoramento.', error: err.message });
    }
  }
}

module.exports = MonitoramentoController;
