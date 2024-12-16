const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Ruta raíz redirige a login si no hay sesión
router.get('/', (req, res) => {
  const token = req.cookies.token;
  if (token) {
    return res.redirect('/dashboard');
  }
  res.render('login');
});

// Ruta de login
router.get('/login', (req, res) => {
  const token = req.cookies.token;
  if (token) {
    return res.redirect('/dashboard');
  }
  res.render('login');
});

// Ruta de registro
router.get('/register', (req, res) => {
  const token = req.cookies.token;
  if (token) {
    return res.redirect('/dashboard');
  }
  res.render('register');
});

// Dashboard (protegido)
router.get('/dashboard', auth, async (req, res) => {
  try {
    const stats = {
      vales: 0,
      nominas: 0, 
      custodios: 0,
      ordenes: 0
    };
    res.render('dashboard', { stats });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).render('error', { error: 'Error al cargar el dashboard' });
  }
});

// Redirección de /ordenes a /workshop-orders
router.get('/ordenes', auth, (req, res) => {
  res.redirect('/workshop-orders');
});

module.exports = router;