const express = require("express");
const AuthController = require("../controllers/authController");

const router = express.Router();

router.post("/logar", AuthController.login);

module.exports = router;