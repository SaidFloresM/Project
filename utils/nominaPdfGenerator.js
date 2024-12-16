const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generatePDF = async (nomina) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'LETTER',
      margins: {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
      }
    });

    const filename = `nomina-${nomina._id}.pdf`;
    const filePath = path.join('uploads', 'pdfs', filename);
    const logoPath = path.join(__dirname, '..', 'public', 'images', 'logo.png');

    if (!fs.existsSync(path.join('uploads', 'pdfs'))) {
      fs.mkdirSync(path.join('uploads', 'pdfs'), { recursive: true });
    }

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Logo y encabezado
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 45, { width: 100 });
    }

    doc.fontSize(16)
       .text('Estrategia en Seguridad Privada y', 160, 50)
       .text('Transporte Matoh SA de CV', 160, 70);

    // Título
    doc.moveDown(2)
       .fontSize(20)
       .text('Nómina de Custodio', { align: 'center' });

    // Información básica
    doc.moveDown()
       .fontSize(12)
       .text(`Custodio: ${nomina.custodio}`)
       .text(`Período: ${nomina.fechaInicio.toLocaleDateString()} - ${nomina.fechaFin.toLocaleDateString()}`)
       .text(`Estatus: ${nomina.estatus}`);

    // Tabla de vales
    doc.moveDown()
       .fontSize(14)
       .text('Vales Incluidos', { underline: true });

    doc.moveDown()
       .fontSize(12);

    // Encabezados de tabla
    const tableTop = doc.y + 20;
    doc.text('Folio', 50, tableTop)
       .text('Fecha', 150, tableTop)
       .text('Ruta', 250, tableTop)
       .text('Viáticos', 400, tableTop)
       .text('Monto', 500, tableTop);

    // Línea separadora
    doc.moveTo(50, tableTop + 15)
       .lineTo(550, tableTop + 15)
       .stroke();

    // Datos de los vales
    let y = tableTop + 30;
    nomina.vales.forEach(vale => {
      doc.text(vale.folio, 50, y)
         .text(vale.fechaViaje.toLocaleDateString(), 150, y)
         .text(`${vale.origen} - ${vale.destino}`, 250, y)
         .text(`$${vale.viaticosDepositados.toFixed(2)}`, 400, y)
         .text(`$${vale.montoViaje.toFixed(2)}`, 500, y);
      y += 20;
    });

    // Totales
    doc.moveDown(2)
       .fontSize(14)
       .text('Resumen', { underline: true });

    doc.moveDown()
       .fontSize(12)
       .text(`Total Viáticos: $${nomina.totalViaticos.toFixed(2)}`)
       .text(`Total Pagos: $${nomina.totalPagos.toFixed(2)}`);

    doc.end();

    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
};

module.exports = generatePDF;