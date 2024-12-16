const Vale = require('../models/Vale');
const generatePDF = require('../utils/pdfGenerator');
const logger = require('../utils/logger');
const { handleError } = require('../utils/errorHandler');

exports.getAllVales = async (req, res) => {
  try {
    const vales = await Vale.find({ createdBy: req.user.userId })
                           .sort('-createdAt');
    res.render('vales/index', { 
      vales: vales || [],
      title: 'Lista de Vales'
    });
  } catch (error) {
    handleError(error, res, 'Error al cargar los vales');
  }
};

exports.getNewValeForm = (req, res) => {
  res.render('vales/new', {
    title: 'Nuevo Vale'
  });
};

exports.createVale = async (req, res) => {
  try {
    const valeData = {
      ...req.body,
      imagenes: req.files ? req.files.map(file => file.filename) : [],
      createdBy: req.user.userId
    };

    const vale = new Vale(valeData);
    await vale.save();
    
    res.redirect('/vales');
  } catch (error) {
    handleError(error, res, 'Error al crear el vale', 'vales/new');
  }
};

exports.getEditVale = async (req, res) => {
  try {
    const vale = await Vale.findOne({ 
      _id: req.params.id, 
      createdBy: req.user.userId 
    });
    
    if (!vale) {
      return res.status(404).render('error', { error: 'Vale no encontrado' });
    }
    
    res.render('vales/edit', { 
      vale,
      title: 'Editar Vale'
    });
  } catch (error) {
    handleError(error, res, 'Error al cargar el vale');
  }
};

exports.updateVale = async (req, res) => {
  try {
    const vale = await Vale.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      {
        ...req.body,
        imagenes: req.files ? 
          [...(req.body.imagenes || []), ...req.files.map(file => file.filename)] :
          req.body.imagenes
      },
      { new: true }
    );

    if (!vale) {
      return res.status(404).render('error', { error: 'Vale no encontrado' });
    }

    res.redirect('/vales');
  } catch (error) {
    handleError(error, res, 'Error al actualizar el vale', 'vales/edit');
  }
};

exports.deleteVale = async (req, res) => {
  try {
    const vale = await Vale.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId
    });

    if (!vale) {
      return res.status(404).json({ success: false, error: 'Vale no encontrado' });
    }

    res.json({ success: true });
  } catch (error) {
    handleError(error, res, 'Error al eliminar el vale', null, true);
  }
};

exports.downloadVale = async (req, res) => {
  try {
    const vale = await Vale.findOne({
      _id: req.params.id,
      createdBy: req.user.userId
    });

    if (!vale) {
      return res.status(404).render('error', { error: 'Vale no encontrado' });
    }

    const pdfPath = await generatePDF(vale);
    res.download(pdfPath);
  } catch (error) {
    handleError(error, res, 'Error al generar el PDF');
  }
};