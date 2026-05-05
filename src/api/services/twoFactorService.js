const nodemailer = require('nodemailer');

const codigos = new Map();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.gerarCodigo = (email) => {
  const codigo = Math.floor(100000 + Math.random() * 900000).toString();
  codigos.set(email, { codigo, expira: Date.now() + 5 * 60 * 1000 });
  return codigo;
};

exports.enviarCodigo = async (email, codigo) => {
  try {
    const info = await transporter.sendMail({
      from: `"Sistema" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Seu código de verificação',
      text: `Código: ${codigo} — válido por 5 minutos.`,
    });
    console.log('Email enviado:', info.response);
  } catch (err) {
    console.error('Erro ao enviar email:', err.message);
  }
};

exports.verificarCodigo = (email, codigo) => {
  const dados = codigos.get(email);
  if (!dados || Date.now() > dados.expira) return false;
  if (dados.codigo !== codigo) return false;
  codigos.delete(email);
  return true;
};