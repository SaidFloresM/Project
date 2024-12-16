const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const valeController = require('../controllers/valeController');
const upload = require('../config/multer');

// Rutas principales
router.get('/', auth, valeController.getAllVales);
router.get('/new', auth, valeController.getNewValeForm);
router.post('/', auth, upload.array('imagenes', 5), valeController.createVale);
router.get('/:id/edit', auth, valeController.getEditVale);
router.post('/:id', auth, upload.array('imagenes', 5), valeController.updateVale);
router.get('/:id/download', auth, valeController.downloadVale);
router.delete('/:id', auth, valeController.deleteVale);

module.exports = router;