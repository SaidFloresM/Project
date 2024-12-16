const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs/promises');
const WorkshopOrder = require('../../models/WorkshopOrder');
const { 
  addHeader, 
  addVehicleInfo, 
  addServicesTable, 
  addSignature 
} = require('../../utils/pdf/workshopOrderTemplate');

exports.generatePDF = async (req, res) => {
  let doc = null;
  
  try {
    const order = await WorkshopOrder.findById(req.params.id);
    if (!order) {
      return res.status(404).render('error', { error: 'Orden no encontrada' });
    }

    // Crear documento PDF
    doc = new PDFDocument({
      size: 'LETTER',
      margins: { top: 50, bottom: 50, left: 50, right: 50 }
    });

    // Configurar respuesta
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=orden-${order.unidad}.pdf`);
    doc.pipe(res);

    // Obtener ruta del logo
    const logoPath = path.join(__dirname, '../../public/images/logo.png');
    let logoExists = false;
    
    try {
      await fs.access(logoPath);
      logoExists = true;
    } catch (err) {
      console.warn('Logo not found:', err.message);
    }

    // Generar PDF
    addHeader(doc, logoExists ? logoPath : null);
    addVehicleInfo(doc, order);
    const lastY = addServicesTable(doc, order);
    addSignature(doc, order, lastY);

    // Finalizar documento
    doc.end();
  } catch (error) {
    console.error('Error al generar PDF:', error);
    
    if (doc) {
      doc.end();
    }

    if (!res.headersSent) {
      res.status(500).render('error', { error: 'Error al generar el PDF' });
    }
  }
};