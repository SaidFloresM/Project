const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const viewController = require('../controllers/workshopOrder/viewController');
const createController = require('../controllers/workshopOrder/createController');
const updateController = require('../controllers/workshopOrder/updateController');
const deleteController = require('../controllers/workshopOrder/deleteController');
const pdfController = require('../controllers/workshopOrder/pdfController');

// Rutas de vista
router.get('/', auth, viewController.getAllOrders);
router.get('/new', auth, viewController.getNewOrderForm);
router.get('/:id', auth, viewController.getOrderDetail);
router.get('/:id/edit', auth, updateController.getEditForm);

// Rutas de acción
router.post('/', auth, createController.createWorkshopOrder);
router.post('/:id', auth, updateController.updateWorkshopOrder);
router.delete('/:id', auth, deleteController.deleteWorkshopOrder);

// Rutas de PDF
router.get('/:id/pdf', auth, pdfController.generatePDF);

module.exports = router;