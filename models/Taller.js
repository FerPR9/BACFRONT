const mongoose = require('mongoose');

const TallerEsquema = new mongoose.Schema({
  nombreTaller: {
    type: String,
    required: true,
  },
  nombreResponsable: {
    type: String,
    required: true,
  },
  fechaTaller: {
    type: Date,
    required: true,
  },
  lugarTaller: {
    type: String,
    required: true,
  },
  cupoTaller: {
    type: Number,
    required: true,
  },
  fotoResponsableTaller: {
    type: String, 
    required: true,
  },
  experienciaResponsableTaller: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Taller", TallerEsquema);
