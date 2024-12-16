const path = require('path');

function addHeader(doc, logoPath) {
  try {
    // Logo
    if (logoPath) {
      doc.image(logoPath, 50, 30, { width: 100 });
    }

    // Título de la empresa
    doc.font('Helvetica-Bold')
       .fontSize(14)
       .text('ESTRATEGIA EN SEGURIDAD PRIVADA Y', 170, 45)
       .text('TRANSPORTE MATOH SA DE CV', 170, 65);

    // Título del documento
    doc.moveDown(2)
       .fontSize(16)
       .text('ORDEN DE SERVICIO', { align: 'center' });
  } catch (error) {
    console.error('Error adding header:', error);
  }
}

function addVehicleInfo(doc, order) {
  doc.moveDown()
     .fontSize(12)
     .text(`Unidad: ${order.unidad}`, 50, 150)
     .text(`Placas: ${order.placas}`, 250, 150)
     .text(`Fecha: ${new Date(order.fecha).toLocaleDateString()}`, 450, 150);
}

function addServicesTable(doc, order) {
  const startY = 200;
  doc.fontSize(10);
  
  // Headers
  doc.font('Helvetica-Bold')
     .text('CONCEPTOS', 50, startY, { width: 150 })
     .text('CANTIDAD', 200, startY, { width: 80 })
     .text('SERVICIO SOLICITADO', 280, startY, { width: 170 })
     .text('KMJE', 450, startY, { width: 80 });

  // Separator line
  doc.moveTo(50, startY + 15)
     .lineTo(550, startY + 15)
     .stroke();

  // Service concepts
  const conceptos = [
    'CAMBIO DE ACEITE',
    'AFINACION',
    'ALINEACION Y BALANCEO',
    'ROTACION DE LLANTAS',
    'SISTEMA DE FRENOS',
    'SISTEMA ELECTRICO',
    'CLUTCH',
    'SUSPENSION',
    'LLANTAS',
    'BALEROS LLANTAS DELANTERAS',
    'REVISION SUSPENSION',
    'ACELERACION',
    'BATERIA',
    'BALEROS',
    'AMORTIGUADORES',
    'CAJA VEL.',
    'MOTOR',
    'ESCAÑEO',
    'OTROS'
  ];

  let y = startY + 25;
  doc.font('Helvetica');
  
  conceptos.forEach(concepto => {
    const servicio = order.servicios.find(s => s.concepto === concepto) || {};
    
    doc.text(concepto, 50, y, { width: 150 })
       .text(servicio.cantidad?.toString() || '', 200, y, { width: 80 })
       .text(servicio.servicioSolicitado || '', 280, y, { width: 170 })
       .text(servicio.kmje?.toString() || '', 450, y, { width: 80 });
    
    y += 20;
  });

  return y; // Return the last Y position
}

function addSignature(doc, order, startY) {
  const firmaY = startY + 40;
  doc.moveTo(50, firmaY).lineTo(250, firmaY).stroke();
  doc.text('SOLICITA', 120, firmaY + 10);
  doc.text(order.solicitante, 70, firmaY - 20);
}

module.exports = {
  addHeader,
  addVehicleInfo,
  addServicesTable,
  addSignature
};