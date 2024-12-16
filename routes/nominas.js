const express = require('express');
const router = express.Router();
const nominaController = require('../controllers/nominaController');
const auth = require('../middleware/auth');

// Rutas principales
router.get('/', auth, nominaController.getNominas);
router.get('/new', auth, nominaController.getNewNomina);
router.post('/', auth, nominaController.createNomina);
router.get('/:id/edit', auth, nominaController.getEditNomina);
router.post('/:id', auth, nominaController.updateNomina);
router.delete('/:id', auth, nominaController.deleteNomina);
router.get('/:id/download', auth, nominaController.downloadNomina);
router.get('/:id/share-whatsapp', auth, nominaController.shareWhatsApp);

module.exports = router;