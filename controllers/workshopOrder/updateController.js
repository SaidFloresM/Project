const WorkshopOrder = require('../../models/WorkshopOrder');

exports.getEditForm = async (req, res) => {
  try {
    const order = await WorkshopOrder.findOne({
      _id: req.params.id,
      createdBy: req.user.userId
    });

    if (!order) {
      return res.status(404).render('error', { error: 'Orden no encontrada' });
    }

    res.render('workshop-orders/edit', { order });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).render('error', { error: 'Error al cargar el formulario' });
  }
};

exports.updateWorkshopOrder = async (req, res) => {
  try {
    const { unidad, placas, kilometraje, solicitante, servicios } = req.body;
    
    // Procesar servicios y determinar estados
    const processedServicios = Object.entries(servicios)
      .map(([concepto, data]) => {
        if (!data.cantidad && !data.servicioSolicitado && !data.kmje) {
          return null;
        }

        // Si solo hay un servicio solicitado, marcar como completado
        // Si hay más de uno, mantener como pendiente
        const serviciosSolicitados = data.servicioSolicitado ? data.servicioSolicitado.split(',').length : 0;
        const estado = serviciosSolicitados === 1 ? 'completado' : 'pendiente';

        return {
          concepto,
          cantidad: data.cantidad,
          servicioSolicitado: data.servicioSolicitado,
          kmje: data.kmje,
          estado
        };
      })
      .filter(servicio => servicio !== null);

    // Determinar estado general de la orden
    const allCompleted = processedServicios.every(s => s.estado === 'completado');
    const anyCompleted = processedServicios.some(s => s.estado === 'completado');
    const estado = allCompleted ? 'completado' : anyCompleted ? 'en_proceso' : 'pendiente';

    const order = await WorkshopOrder.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      {
        unidad,
        placas,
        kilometraje,
        estado,
        solicitante,
        servicios: processedServicios
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).render('error', { error: 'Orden no encontrada' });
    }

    res.redirect('/workshop-orders');
  } catch (error) {
    console.error('Error al actualizar orden:', error);
    res.status(400).render('workshop-orders/edit', {
      error: 'Error al actualizar la orden',
      order: req.body
    });
  }
};