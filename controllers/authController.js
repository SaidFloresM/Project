const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.render('login', { 
        error: 'Usuario o contraseña incorrectos' 
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });

    res.redirect('/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    res.render('login', { 
      error: 'Error al iniciar sesión' 
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render('register', { 
        error: 'El usuario ya existe' 
      });
    }

    const user = new User({ username, password });
    await user.save();

    res.redirect('/login');
  } catch (error) {
    console.error('Registration error:', error);
    res.render('register', { 
      error: 'Error al registrar usuario' 
    });
  }
};