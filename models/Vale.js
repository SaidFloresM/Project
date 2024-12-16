const mongoose = require('mongoose');

const valeSchema = new mongoose.Schema({
  folio: {
    type: String,
    required: true,
    unique: true
  },
  origen: {
    type: String,
    required: true
  },
  destino: {
    type: String,
    required: true
  },
  cliente: {
    type: String,
    required: true
  },
  unidad: {
    type: String,
    required: true
  },
  custodio1: {
    type: String,
    required: true
  },
  custodio2: {
    type: String,
    required: true
  },
  estatus: {
    type: String,
    enum: ['Capturado', 'Verificado'],
    default: 'Capturado'
  },
  fechaVerificado: {
    type: Date
  },
  horaVerificado: {
    type: String
  },
  viaticosDepositados: {
    type: Number,
    required: true,
    default: 0
  },
  montoEfectivo: {
    type: Number,
    default: 0
  },
  efectivoEntregadoVia: {
    type: String
  },
  casetas: {
    type: Number,
    default: 0
  },
  peajes: {
    type: Number,
    default: 0
  },
  gasolinaFacturada: {
    type: Number,
    default: 0
  },
  hospedaje: {
    type: Number,
    default: 0
  },
  otros: {
    type: Number,
    default: 0
  },
  cargosAdicionales: {
    type: Number,
    default: 0
  },
  referenciaCliente: {
    type: String
  },
  total: {
    type: Number,
    default: 0
  },
  saldoEntregado: {
    type: Number,
    default: 0
  },
  saldoPendiente: {
    type: Number,
    default: 0
  },
  fechaViaje: {
    type: Date,
    required: true,
    default: Date.now
  },
  montoViaje: {
    type: Number,
    required: true,
    default: 0
  },
  notas: String,
  imagenes: [{
    type: String
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

// Middleware pre-save para calcular totales
valeSchema.pre('save', function(next) {
  this.total = this.casetas + this.peajes + this.gasolinaFacturada + 
               this.hospedaje + this.otros + this.cargosAdicionales;
  this.saldoPendiente = this.viaticosDepositados - this.total;
  next();
});

module.exports = mongoose.model('Vale', valeSchema);