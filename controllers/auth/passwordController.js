const User = require('../../models/User');
const crypto = require('crypto');
const { sendPasswordResetEmail } = require('../../utils/emailUtils');

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.render('forgot-password', {
        error: 'No existe una cuenta con ese correo electrónico'
      });
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await user.save();

    await sendPasswordResetEmail(user.email, token, req.headers.host);

    res.render('forgot-password', {
      message: 'Se ha enviado un correo con las instrucciones'
    });
  } catch (error) {
    console.error('Error en recuperación de contraseña:', error);
    res.render('forgot-password', {
      error: 'Error al procesar la solicitud'
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.render('reset', {
        error: 'El token es inválido o ha expirado'
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.render('login', {
      message: 'Tu contraseña ha sido actualizada'
    });
  } catch (error) {
    console.error('Error al restablecer contraseña:', error);
    res.render('reset', {
      error: 'Error al restablecer la contraseña'
    });
  }
};