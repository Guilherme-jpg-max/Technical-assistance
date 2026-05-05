const express = require("express");
const ItemController = require("../controllers/itemController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require('../../config/cloudinary');

const router = express.Router();

// Rotas para Entrada de Aparelhos
router.get("/entrada-aparelhos", authMiddleware, ItemController.getAllEntradaAparelhos);
router.get("/entrada-aparelhos/search/:codigo", authMiddleware, ItemController.searchEntradaAparelhoByCodigo);
router.get("/entrada-aparelhos/pdf/download", authMiddleware, ItemController.generateEntradaAparelhosPdf);
router.get("/entrada-aparelhos/:id", authMiddleware, ItemController.getEntradaAparelhoById);
router.post("/entrada-aparelhos", authMiddleware, upload.single('imagem'), ItemController.createEntradaAparelho);
router.put("/entrada-aparelhos/:id", authMiddleware, ItemController.updateEntradaAparelho);
router.delete("/entrada-aparelhos/:id", authMiddleware, ItemController.deleteEntradaAparelho);

// Rotas para Orçamentos
router.get("/orcamentos", authMiddleware, ItemController.getAllOrcamentos);
router.get("/orcamentos/:id", authMiddleware, ItemController.getOrcamentoById);
router.post("/orcamentos", authMiddleware, ItemController.createOrcamento);
router.put("/orcamentos/:id", authMiddleware, ItemController.updateOrcamento);
router.delete("/orcamentos/:id", authMiddleware, ItemController.deleteOrcamento);

module.exports = router;