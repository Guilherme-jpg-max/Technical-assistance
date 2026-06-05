const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const MonitoramentoController = require('../controllers/monitoramentoController');

const router = express.Router();

router.get('/monitoramento', authMiddleware, MonitoramentoController.generateMonthlyReport);

module.exports = router;
