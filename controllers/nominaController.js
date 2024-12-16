const Nomina = require('../models/Nomina');
const Vale = require('../models/Vale');
const generatePDF = require('../utils/nominaPdfGenerator');

exports.getNominas = async (req, res) => {
  try {
    const nominas = await Nomina.find({ createdBy: req.user.userId })
                               .populate('vales')
                               .sort('-createdAt'); // Ordenar por fecha de creación descendente
    res.render('nominas/index', { nominas });
  } catch (error) {
    console.error('Error al obtener nóminas:', error);
    res.status(500).render('error', { error: 'Error al cargar las nóminas' });
  }
};

exports.getNewNomina = async (req, res) => {
  try {
    const valesDisponibles = await Vale.find({
      createdBy: req.user.userId,
      'nomina': { $exists: false }
    });
    res.render('nominas/new', { valesDisponibles });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).render('error', { error: 'Error al cargar el formulario' });
  }
};

exports.createNomina = async (req, res) => {
  try {
    const { custodio, fechaInicio, fechaFin, vales, descuentos = 0 } = req.body;
    
    const nomina = new Nomina({
      custodio,
      fechaInicio,
      fechaFin,
      vales,
      descuentos,
      createdBy: req.user.userId,
      estatus: 'En Proceso'
    });

    await nomina.save();

    // Actualizar los vales seleccionados
    if (vales && vales.length > 0) {
      await Vale.updateMany(
        { _id: { $in: vales } },
        { $set: { nomina: nomina._id } }
      );
    }

    res.redirect('/nominas');
  } catch (error) {
    console.error('Error:', error);
    res.status(400).render('nominas/new', { 
      error: 'Error al crear la nómina',
      valesDisponibles: []
    });
  }
};

exports.getEditNomina = async (req, res) => {
  try {
    const nomina = await Nomina.findOne({
      _id: req.params.id,
      createdBy: req.user.userId
    }).populate('vales');

    if (!nomina) {
      return res.status(404).render('error', { error: 'Nómina no encontrada' });
    }

    const valesDisponibles = await Vale.find({
      createdBy: req.user.userId,
      $or: [
        { nomina: { $exists: false } },
        { nomina: nomina._id }
      ]
    });

    res.render('nominas/edit', { nomina, valesDisponibles });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).render('error', { error: 'Error al cargar la nómina' });
  }
};

exports.updateNomina = async (req, res) => {
  try {
    const { custodio, fechaInicio, fechaFin, vales, estatus, descuentos = 0 } = req.body;
    
    const nomina = await Nomina.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      { custodio, fechaInicio, fechaFin, vales, estatus, descuentos },
      { new: true }
    );

    if (!nomina) {
      return res.status(404).render('error', { error: 'Nómina no encontrada' });
    }

    // Actualizar vales
    await Vale.updateMany(
      { nomina: nomina._id },
      { $unset: { nomina: "" } }
    );

    if (vales && vales.length > 0) {
      await Vale.updateMany(
        { _id: { $in: vales } },
        { $set: { nomina: nomina._id } }
      );
    }

    res.redirect('/nominas');
  } catch (error) {
    console.error('Error:', error);
    res.status(400).render('nominas/edit', {
      error: 'Error al actualizar la nómina',
      nomina: req.body,
      valesDisponibles: []
    });
  }
};

exports.deleteNomina = async (req, res) => {
  try {
    const nomina = await Nomina.findOne({
      _id: req.params.id,
      createdBy: req.user.userId
    });

    if (!nomina) {
      return res.status(404).json({ success: false, error: 'Nómina no encontrada' });
    }

    // Liberar los vales asociados
    await Vale.updateMany(
      { nomina: nomina._id },
      { $unset: { nomina: "" } }
    );

    await nomina.deleteOne();
    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Error al eliminar la nómina' });
  }
};

exports.downloadNomina = async (req, res) => {
  try {
    const nomina = await Nomina.findOne({
      _id: req.params.id,
      createdBy: req.user.userId
    }).populate('vales');

    if (!nomina) {
      return res.status(404).render('error', { error: 'Nómina no encontrada' });
    }

    const pdfPath = await generatePDF(nomina);
    res.download(pdfPath);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).render('error', { error: 'Error al generar el PDF' });
  }
};

exports.shareWhatsApp = async (req, res) => {
  try {
    const nomina = await Nomina.findOne({
      _id: req.params.id,
      createdBy: req.user.userId
    });

    if (!nomina) {
      return res.status(404).json({ success: false, error: 'Nómina no encontrada' });
    }

    // URL simulada para WhatsApp
    const message = `Nómina de ${nomina.custodio} - Período: ${nomina.fechaInicio.toLocaleDateString()} al ${nomina.fechaFin.toLocaleDateString()}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;

    res.json({ success: true, url });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Error al compartir la nómina' });
  }
};