const express = require("express");
const AuthController = require("../controllers/authController");

const router = express.Router();

router.post("/logar", AuthController.login);
router.post("/verificar-2fa", AuthController.verificar2FA);

module.exports = router;