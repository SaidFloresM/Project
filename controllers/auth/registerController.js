const User = require('../../models/User');
const { generateToken } = require('../../utils/jwtUtils');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] 
    });
    
    if (existingUser) {
      return res.render('register', { 
        error: 'El usuario o correo electrónico ya existe' 
      });
    }

    const user = new User({ username, email, password });
    await user.save();
    
    const token = generateToken(user._id);
    res.cookie('token', token, { httpOnly: true });
    
    res.redirect('/vales');
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(400).render('register', { 
      error: 'Error al registrar usuario' 
    });
  }
};