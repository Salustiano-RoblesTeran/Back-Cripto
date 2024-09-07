const { Schema, model } = require('mongoose');

// Modelo de criptomonedas para asociarlas al portfolio
const CriptoSchema = new Schema({
  idCripto: {
    type: String,
    required: true,
  },
  precioCpra: {
    type: Number,
    required: true,
  },
  precioVta: {
    type: Number,
    required: true,
  },
});

// Modelo de portfolio
const PortfolioSchema = new Schema({
  idUsuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  nombre: {
    type: String,
    required: [true, "Este campo es obligatorio"],  // El nombre es obligatorio
  },
  criptomonedas: [CriptoSchema],  // Relacionar criptomonedas
});

module.exports = model('Portfolio', PortfolioSchema);
