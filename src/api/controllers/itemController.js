const ItemService = require("../services/itemService");
const PdfService = require("../services/pdfService");

class ItemController {

  // ─── EntradaAparelho ───────────────────────────────────────────────

  static async getAllEntradaAparelhos(req, res) {
    try {
      const itens = await ItemService.getAllEntradaAparelhos();
      res.status(200).json(itens);
    } catch (e) {
      res.status(500).json({ message: "Erro ao buscar aparelhos.", error: e.message });
    }
  }

  static async getEntradaAparelhoById(req, res) {
    try {
      const item = await ItemService.getEntradaAparelhoById(req.params.id);
      if (!item) return res.status(404).json({ message: "Item não encontrado." });
      res.status(200).json(item);
    } catch (e) {
      res.status(500).json({ message: "Erro ao buscar aparelho.", error: e.message });
    }
  }

  static async createEntradaAparelho(req, res) {
    try {
      const imageUrl = req.file?.path || null;
      const newItem = await ItemService.createEntradaAparelho({ ...req.body, imageUrl });
      res.status(201).json(newItem);
    } catch (e) {
      res.status(500).json({ message: "Erro ao criar aparelho.", error: e.message });
    }
  }

  static async updateEntradaAparelho(req, res) {
    try {
      const updated = await ItemService.updateEntradaAparelho(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "Item não encontrado para atualização." });
      res.status(200).json(updated);
    } catch (e) {
      res.status(500).json({ message: "Erro ao atualizar aparelho.", error: e.message });
    }
  }

  static async deleteEntradaAparelho(req, res) {
    try {
      const deleted = await ItemService.deleteEntradaAparelho(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Item não encontrado para exclusão." });
      res.status(204).send();
    } catch (e) {
      res.status(500).json({ message: "Erro ao deletar aparelho.", error: e.message });
    }
  }

  static async searchEntradaAparelhoByCodigo(req, res) {
    try {
      const item = await ItemService.searchEntradaAparelhoByCodigo(req.params.codigo);
      if (!item) return res.status(404).json({ message: "Item não encontrado pelo código." });
      res.status(200).json(item);
    } catch (e) {
      res.status(500).json({ message: "Erro na busca.", error: e.message });
    }
  }

  static async generateEntradaAparelhosPdf(req, res) {
    try {
      const itens = await ItemService.getAllEntradaAparelhos();
      const pdfBase64 = await PdfService.generateItemListPdf(itens, "Lista de Aparelhos em Assistência");
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=lista_aparelhos.pdf");
      res.send(Buffer.from(pdfBase64.split(",")[1], "base64"));
    } catch (e) {
      res.status(500).json({ message: "Erro ao gerar PDF.", error: e.message });
    }
  }

  // ─── Orcamento ─────────────────────────────────────────────────────

  static async getAllOrcamentos(req, res) {
    try {
      const orcamentos = await ItemService.getAllOrcamentos();
      res.status(200).json(orcamentos);
    } catch (e) {
      res.status(500).json({ message: "Erro ao buscar orçamentos.", error: e.message });
    }
  }

  static async getOrcamentoById(req, res) {
    try {
      const orc = await ItemService.getOrcamentoById(req.params.id);
      if (!orc) return res.status(404).json({ message: "Orçamento não encontrado." });
      res.status(200).json(orc);
    } catch (e) {
      res.status(500).json({ message: "Erro ao buscar orçamento.", error: e.message });
    }
  }

  static async createOrcamento(req, res) {
    try {
      const newOrc = await ItemService.createOrcamento(req.body);
      res.status(201).json(newOrc);
    } catch (e) {
      res.status(500).json({ message: "Erro ao criar orçamento.", error: e.message });
    }
  }

  static async updateOrcamento(req, res) {
    try {
      const updated = await ItemService.updateOrcamento(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "Orçamento não encontrado para atualização." });
      res.status(200).json(updated);
    } catch (e) {
      res.status(500).json({ message: "Erro ao atualizar orçamento.", error: e.message });
    }
  }

  static async deleteOrcamento(req, res) {
    try {
      const deleted = await ItemService.deleteOrcamento(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Orçamento não encontrado para exclusão." });
      res.status(204).send();
    } catch (e) {
      res.status(500).json({ message: "Erro ao deletar orçamento.", error: e.message });
    }
  }
}

module.exports = ItemController;