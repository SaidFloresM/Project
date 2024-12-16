const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
  concepto: String,
  cantidad: Number,
  servicioSolicitado: String,
  kmje: Number,
  costo: Number,
  fechaInicio: Date,
  fechaFin: Date,
  estado: {
    type: String,
    enum: ['pendiente', 'en_proceso', 'completado'],
    default: 'pendiente'
  }
});

const workshopOrderSchema = new mongoose.Schema({
  unidad: {
    type: String,
    required: true
  },
  placas: {
    type: String,
    required: true
  },
  kilometraje: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en_proceso', 'completado'],
    default: 'pendiente'
  },
  servicios: [servicioSchema],
  solicitante: {
    type: String,
    required: true
  },
  costoTotal: {
    type: Number,
    default: 0
  },
  observaciones: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual para el indicador de estado
workshopOrderSchema.virtual('estadoIndicador').get(function() {
  const estados = {
    'pendiente': '🔴',
    'en_proceso': '🟡',
    'completado': '🟢'
  };
  return estados[this.estado];
});

// Middleware para actualizar costoTotal
workshopOrderSchema.pre('save', function(next) {
  this.costoTotal = this.servicios.reduce((total, servicio) => total + (servicio.costo || 0), 0);
  next();
});

module.exports = mongoose.model('WorkshopOrder', workshopOrderSchema);