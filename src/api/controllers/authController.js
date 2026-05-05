const jwt = require("jsonwebtoken");
const Atendente = require("../../models/atendenteModel");
const twoFactorService = require("../services/twoFactorService");

class AuthController {
  static async login(req, res) {
    try {
      const { email, senha } = req.body;
      const atendente = await Atendente.findOne({ email });

      if (!atendente || !(await atendente.verificarSenha(senha)))
        return res.status(401).json({ message: "Credenciais inválidas." });

      const codigo = twoFactorService.gerarCodigo(email);
      await twoFactorService.enviarCodigo(email, codigo);

      res.status(200).json({ message: "Código enviado para o e-mail." });
    } catch (err) {
      res.status(500).json({ message: "Erro interno.", error: err.message });
    }
  }

  static async verificar2FA(req, res) {
    try {
      const { email, codigo } = req.body;

      if (!twoFactorService.verificarCodigo(email, codigo))
        return res.status(401).json({ message: "Código inválido ou expirado." });

      const atendente = await Atendente.findOne({ email });
      const token = jwt.sign(
        { id: atendente._id, email: atendente.email, nome: atendente.nome },
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
      );

      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ message: "Erro interno.", error: err.message });
    }
  }
}

module.exports = AuthController;