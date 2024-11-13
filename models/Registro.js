const mongoose = require('mongoose');

const RegistroEsquema = new mongoose.Schema({
    /*id: {
      type: Number,
      required: true,
    },*/
    nombre: {
      type: String,
      required:true,
    },
    correoElectronico: {
      type: String,
      required:true,
    },
    telefono: {
      type: Number,
      required:true,
    },
    areaTrabajo: {
      type: String,
      required:true,
    },
    foto: {
      type: String,
      required:true,
    },
    fechaRegistro: {
      type: Date,
      default:Date.now(),
    },
   });
   
   
   module.exports = mongoose.model("registro", RegistroEsquema);