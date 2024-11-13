const mongoose = require('mongoose');

const ConferenciaEsquema = new mongoose.Schema({
  nombreConferencia: {
    type: String,
    required: true,
  },
  nombreConferencista: {
    type: String,
    required: true,
  },
  fechaConferencia: {
    type: Date,
    required: true,
  },
  lugarConferencia: {
    type: String,
    required: true,
  },
  cupoConferencia: {
    type: Number,
    required: true,
  },
  fotoConferencista: {
    type: String, // Almacenar como cadena (por ejemplo, URL de la imagen o codificación base64)
    required: true,
  },
  experienciaConferencista: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Conferencia", ConferenciaEsquema);
