const mongoose = require('mongoose');

const nominaSchema = new mongoose.Schema({
  custodio: {
    type: String,
    required: true
  },
  fechaInicio: {
    type: Date,
    required: true
  },
  fechaFin: {
    type: Date,
    required: true
  },
  vales: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vale'
  }],
  totalViaticos: {
    type: Number,
    default: 0
  },
  totalPagos: {
    type: Number,
    default: 0
  },
  descuentos: {
    type: Number,
    default: 0
  },
  estatus: {
    type: String,
    enum: ['En Proceso', 'Pagado', 'Cancelado'],
    default: 'En Proceso'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { 
  timestamps: true 
});

// Middleware para calcular totales
nominaSchema.pre('save', async function(next) {
  if (this.vales && this.vales.length > 0) {
    const Vale = mongoose.model('Vale');
    const valesInfo = await Vale.find({ _id: { $in: this.vales } });
    
    this.totalViaticos = valesInfo.reduce((sum, vale) => sum + vale.viaticosDepositados, 0);
    this.totalPagos = valesInfo.reduce((sum, vale) => sum + vale.montoViaje, 0) - this.descuentos;
  }
  next();
});

module.exports = mongoose.model('Nomina', nominaSchema);