const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendPasswordResetEmail = async (email, token, host) => {
  const mailOptions = {
    to: email,
    from: process.env.EMAIL_USER,
    subject: 'Recuperación de Contraseña - Sistema de Vales',
    text: `Para restablecer tu contraseña, haz clic en el siguiente enlace:\n\n
      http://${host}/reset/${token}\n\n
      Si no solicitaste esto, por favor ignora este correo.\n`
  };

  await transporter.sendMail(mailOptions);
};