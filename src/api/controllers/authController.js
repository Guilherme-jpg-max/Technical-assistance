const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { atendentes } = require("../../data/mockData");

class AuthController {
  static async login(req, res) {
    const { email, senha } = req.body;

    const atendente = atendentes.find(a => a.email === email);

    if (!atendente) {
      return res.status(400).json({ message: "Credenciais inválidas." });
    }

    const isMatch = await bcrypt.compare(senha, atendente.senha);

    if (!isMatch) {
      return res.status(400).json({ message: "Credenciais inválidas." });
    }

    const token = jwt.sign(
      { id: atendente._id, email: atendente.email, nome: atendente.nome },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  }
}

module.exports = AuthController;
