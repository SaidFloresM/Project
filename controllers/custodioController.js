const Custodio = require('../models/Custodio');

exports.getAllCustodios = async (req, res) => {
  try {
    const custodios = await Custodio.find().sort('nombre');
    res.render('custodios/index', { custodios });
  } catch (error) {
    console.error('Error al obtener custodios:', error);
    res.status(500).render('error', { error: 'Error al cargar los custodios' });
  }
};

exports.buscarCustodios = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.length < 2) {
      return res.json([]);
    }

    const custodios = await Custodio.find({
      $or: [
        { nombre: new RegExp(query, 'i') },
        { numeroEmpleado: new RegExp(query, 'i') }
      ]
    }).limit(10);
    
    res.json(custodios);
  } catch (error) {
    console.error('Error al buscar custodios:', error);
    res.status(500).json({ error: 'Error al buscar custodios' });
  }
};

exports.createCustodio = async (req, res) => {
  try {
    const custodio = new Custodio(req.body);
    await custodio.save();
    res.redirect('/custodios');
  } catch (error) {
    console.error('Error al crear custodio:', error);
    res.status(400).render('custodios/new', { 
      error: 'Error al crear el custodio',
      custodio: req.body 
    });
  }
};

exports.updateCustodio = async (req, res) => {
  try {
    const custodio = await Custodio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!custodio) {
      return res.status(404).json({ error: 'Custodio no encontrado' });
    }
    res.json(custodio);
  } catch (error) {
    console.error('Error al actualizar custodio:', error);
    res.status(400).json({ error: 'Error al actualizar el custodio' });
  }
};

exports.deleteCustodio = async (req, res) => {
  try {
    const custodio = await Custodio.findByIdAndDelete(req.params.id);
    if (!custodio) {
      return res.status(404).json({ error: 'Custodio no encontrado' });
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar custodio:', error);
    res.status(500).json({ error: 'Error al eliminar el custodio' });
  }
};