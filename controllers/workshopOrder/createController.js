const WorkshopOrder = require('../../models/WorkshopOrder');

exports.createWorkshopOrder = async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      createdBy: req.user.userId
    };

    const order = new WorkshopOrder(orderData);
    await order.save();

    res.redirect('/workshop-orders');
  } catch (error) {
    console.error('Error al crear orden:', error);
    res.status(400).render('workshop-orders/new', {
      error: 'Error al crear la orden de taller',
      data: req.body
    });
  }
};