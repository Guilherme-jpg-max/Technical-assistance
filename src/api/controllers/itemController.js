const ItemService = require("../services/itemService");
const PdfService = require("../services/pdfService");

class ItemController {
  static async getAllEntradaAparelhos(req, res) {
    const itens = ItemService.getAllEntradaAparelhos();
    res.status(200).json(itens);
  }

  static async getEntradaAparelhoById(req, res) {
    const { id } = req.params;
    const item = ItemService.getEntradaAparelhoById(id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "Item não encontrado." });
    }
  }

  static async createEntradaAparelho(req, res) {
    const newItem = ItemService.createEntradaAparelho(req.body);
    res.status(201).json(newItem);
  }

  static async updateEntradaAparelho(req, res) {
    const { id } = req.params;
    const updatedItem = ItemService.updateEntradaAparelho(id, req.body);
    if (updatedItem) {
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ message: "Item não encontrado para atualização." });
    }
  }

  static async deleteEntradaAparelho(req, res) {
    const { id } = req.params;
    const deleted = ItemService.deleteEntradaAparelho(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Item não encontrado para exclusão." });
    }
  }

  static async searchEntradaAparelhoByCodigo(req, res) {
    const { codigo } = req.params;
    const item = ItemService.searchEntradaAparelhoByCodigo(codigo);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "Item não encontrado pelo código." });
    }
  }

  static async generateEntradaAparelhosPdf(req, res) {
    const itens = ItemService.getAllEntradaAparelhos();
    const pdfBase64 = await PdfService.generateItemListPdf(itens, "Lista de Aparelhos em Assistência");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=lista_aparelhos.pdf");
    res.send(Buffer.from(pdfBase64.split(",")[1], "base64"));
  }

  static async getAllOrcamentos(req, res) {
    const orcamentos = ItemService.getAllOrcamentos();
    res.status(200).json(orcamentos);
  }

  static async getOrcamentoById(req, res) {
    const { id } = req.params;
    const orcamento = ItemService.getOrcamentoById(id);
    if (orcamento) {
      res.status(200).json(orcamento);
    } else {
      res.status(404).json({ message: "Orçamento não encontrado." });
    }
  }

  static async createOrcamento(req, res) {
    const newOrcamento = ItemService.createOrcamento(req.body);
    res.status(201).json(newOrcamento);
  }

  static async updateOrcamento(req, res) {
    const { id } = req.params;
    const updatedOrcamento = ItemService.updateOrcamento(id, req.body);
    if (updatedOrcamento) {
      res.status(200).json(updatedOrcamento);
    } else {
      res.status(404).json({ message: "Orçamento não encontrado para atualização." });
    }
  }

  static async deleteOrcamento(req, res) {
    const { id } = req.params;
    const deleted = ItemService.deleteOrcamento(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Orçamento não encontrado para exclusão." });
    }
  }
}

module.exports = ItemController;
