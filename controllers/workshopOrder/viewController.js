const WorkshopOrder = require('../../models/WorkshopOrder');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await WorkshopOrder.find({ createdBy: req.user.userId })
                                    .sort('-createdAt');

    const stats = {
      total: orders.length,
      pendientes: orders.filter(o => o.estado === 'pendiente').length,
      enProceso: orders.filter(o => o.estado === 'en_proceso').length,
      completadas: orders.filter(o => o.estado === 'completado').length,
      costoTotal: orders.reduce((sum, order) => sum + (order.costoTotal || 0), 0)
    };

    res.render('workshop-orders/index', { orders, stats, filters: {} });
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    res.status(500).render('error', { error: 'Error al cargar las órdenes' });
  }
};

exports.getOrderDetail = async (req, res) => {
  try {
    const order = await WorkshopOrder.findById(req.params.id);
    
    if (!order) {
      return res.status(404).render('error', { error: 'Orden no encontrada' });
    }

    res.render('workshop-orders/detail', { order });
  } catch (error) {
    console.error('Error al obtener orden:', error);
    res.status(500).render('error', { error: 'Error al cargar la orden' });
  }
};

exports.getNewOrderForm = async (req, res) => {
  try {
    res.render('workshop-orders/new');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).render('error', { error: 'Error al cargar el formulario' });
  }
};