const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generatePDF = async (vale) => {
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

    const filename = `vale-${vale.folio}.pdf`;
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
      doc.fontSize(16)
         .text('Estrategia en Seguridad Privada y', 160, 50)
         .text('Transporte Matoh SA de CV', 160, 70);
    }

    // Título centrado
    doc.moveDown(3)
       .fontSize(20)
       .text('Vale de Custodia', { align: 'center' });

    // Información básica
    doc.moveDown()
       .fontSize(12);
    
    // Información del vale en dos columnas
    const leftColumn = 50;
    const rightColumn = 300;
    let yPos = doc.y + 20;

    // Primera fila
    doc.text(`Folio: ${vale.folio}`, leftColumn, yPos);
    doc.text(`Fecha: ${new Date(vale.fechaViaje).toLocaleDateString()}`, rightColumn, yPos);
    yPos += 25;

    // Segunda fila
    doc.text(`Cliente: ${vale.cliente}`, leftColumn, yPos);
    doc.text(`Unidad: ${vale.unidad}`, rightColumn, yPos);
    yPos += 25;

    // Tercera fila
    doc.text(`Origen: ${vale.origen}`, leftColumn, yPos);
    doc.text(`Destino: ${vale.destino}`, rightColumn, yPos);
    yPos += 25;

    // Cuarta fila
    doc.text(`Custodio 1: ${vale.custodio1}`, leftColumn, yPos);
    doc.text(`Custodio 2: ${vale.custodio2}`, rightColumn, yPos);
    yPos += 40;

    // Información financiera
    doc.fontSize(14)
       .text('Información Financiera', leftColumn, yPos, { underline: true });
    doc.fontSize(12)
       .moveDown();

    yPos = doc.y + 10;
    const financialInfo = [
      ['Concepto', 'Monto'],
      ['Viáticos Depositados', `$${vale.viaticosDepositados.toFixed(2)}`],
      ['Monto en Efectivo', `$${vale.montoEfectivo.toFixed(2)}`],
      ['Casetas', `$${vale.casetas.toFixed(2)}`],
      ['Peajes', `$${vale.peajes.toFixed(2)}`],
      ['Gasolina Facturada', `$${vale.gasolinaFacturada.toFixed(2)}`],
      ['Hospedaje', `$${vale.hospedaje.toFixed(2)}`],
      ['Otros', `$${vale.otros.toFixed(2)}`],
      ['Cargos Adicionales', `$${vale.cargosAdicionales.toFixed(2)}`],
      ['Total Gastos', `$${vale.total.toFixed(2)}`],
      ['Saldo Pendiente', `$${vale.saldoPendiente.toFixed(2)}`]
    ];

    financialInfo.forEach((row, i) => {
      doc.font(i === 0 ? 'Helvetica-Bold' : 'Helvetica')
         .text(row[0], leftColumn, yPos)
         .text(row[1], 400, yPos);
      yPos += 20;
    });

    // Firmas al final de la página
    yPos = doc.page.height - 150;

    // Líneas para firmas
    doc.moveTo(leftColumn, yPos).lineTo(leftColumn + 200, yPos).stroke();
    doc.moveTo(rightColumn, yPos).lineTo(rightColumn + 200, yPos).stroke();

    // Textos de firma debajo de las líneas
    doc.text('Firma Custodio 1', leftColumn + 60, yPos + 10);
    doc.text('Firma Custodio 2', rightColumn + 60, yPos + 10);

    doc.end();

    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
};

module.exports = generatePDF;