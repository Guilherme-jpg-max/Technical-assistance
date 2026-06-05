const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const ExportController = require('../controllers/exportController');

const router = express.Router();

router.get('/csv', authMiddleware, ExportController.downloadCsv);

module.exports = router;
