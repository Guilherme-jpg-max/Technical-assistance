const { Resend } = require('resend');

const codigos = new Map();
const resend = new Resend(process.env.RESEND_API_KEY);

exports.gerarCodigo = (email) => {
  const codigo = Math.floor(100000 + Math.random() * 900000).toString();
  codigos.set(email, { codigo, expira: Date.now() + 5 * 60 * 1000 });
  return codigo;
};

exports.enviarCodigo = async (email, codigo) => {
  try {
    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Seu código de verificação',
      text: `Código: ${codigo} — válido por 5 minutos.`,
    });
    if (error) console.error('Erro ao enviar email:', error);
    else console.log('Email enviado com sucesso');
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