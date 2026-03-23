const { jsPDF } = require("jspdf");
require("jspdf-autotable");

class PdfService {
  static async generateItemListPdf(items, title = "Lista de Itens") {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(title, 14, 22);

    const tableColumn = [
      "ID",
      "Atendente",
      "Cliente",
      "Modelo",
      "Marca",
      "Status",
      "Entrada",
    ];
    const tableRows = [];

    items.forEach(item => {
      const itemData = [
        item._id.substring(0, 8) + "...", // Truncar ID para melhor visualização
        item.nome_atendente,
        item.nome_cliente,
        item.modelo_aparelho,
        item.marca_aparelho,
        item.status,
        new Date(item.data_entrada).toLocaleDateString("pt-BR"),
      ];
      tableRows.push(itemData);
    });

    doc.autoTable(tableColumn, tableRows, {
      startY: 30,
      headStyles: { fillColor: [41, 128, 185] },
      styles: { fontSize: 8, cellPadding: 2, overflow: "linebreak" },
      columnStyles: { 0: { cellWidth: 20 }, 1: { cellWidth: 25 }, 2: { cellWidth: 25 }, 3: { cellWidth: 25 }, 4: { cellWidth: 20 }, 5: { cellWidth: 20 }, 6: { cellWidth: 20 } },
    });

    return doc.output("datauristring");
  }
}

module.exports = PdfService;
