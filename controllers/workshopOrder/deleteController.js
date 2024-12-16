const WorkshopOrder = require('../../models/WorkshopOrder');

exports.deleteWorkshopOrder = async (req, res) => {
  try {
    const order = await WorkshopOrder.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId
    });

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        error: 'Orden no encontrada' 
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error al eliminar orden:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al eliminar la orden' 
    });
  }
};