const express = require("express");
const LogController = require("../controllers/logController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/logs", authMiddleware, LogController.getAllLogs);
router.get("/logs/:date", authMiddleware, LogController.getLogsByDate);

module.exports = router;
