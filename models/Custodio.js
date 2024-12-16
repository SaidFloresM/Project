const mongoose = require('mongoose');

const custodioSchema = new mongoose.Schema({
  numeroEmpleado: {
    type: String,
    required: true,
    unique: true
  },
  nombre: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    enum: ['ALTA', 'BAJA', 'INCAPACITADO'],
    default: 'ALTA'
  },
  telefono: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} no es un número de teléfono válido!`
    }
  }
}, { timestamps: true });

custodioSchema.index({ 
  nombre: 'text',
  numeroEmpleado: 'text'
});

module.exports = mongoose.model('Custodio', custodioSchema);