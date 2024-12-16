const User = require('../../models/User');
const { generateToken } = require('../../utils/jwtUtils');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ 
      $or: [{ username }, { email: username }] 
    });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).render('login', { 
        error: 'Usuario o contraseña incorrectos' 
      });
    }

    const token = generateToken(user._id);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/vales');
  } catch (error) {
    console.error('Error en login:', error);
    res.status(400).render('login', { 
      error: 'Error al iniciar sesión' 
    });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
};