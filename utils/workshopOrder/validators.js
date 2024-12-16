exports.validateWorkshopOrder = (data) => {
  const errors = [];

  if (!data.unidad) {
    errors.push('La unidad es requerida');
  }

  if (!data.placas) {
    errors.push('Las placas son requeridas');
  }

  if (!data.kilometraje || data.kilometraje <= 0) {
    errors.push('El kilometraje debe ser mayor a 0');
  }

  if (!data.solicitante) {
    errors.push('El solicitante es requerido');
  }

  return errors;
};