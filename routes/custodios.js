const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const custodioController = require('../controllers/custodioController');

router.get('/', auth, custodioController.getAllCustodios);
router.get('/buscar', auth, custodioController.buscarCustodios);
router.post('/', auth, custodioController.createCustodio);
router.put('/:id', auth, custodioController.updateCustodio);
router.delete('/:id', auth, custodioController.deleteCustodio);

module.exports = router;