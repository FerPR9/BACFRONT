const mongoose = require('mongoose');

const AreaDeTrabajoSchema = new mongoose.Schema({
  areas_de_trabajo: [{
    Nombre: String
  }]
});

const AreaDeTrabajo = mongoose.model('AreaDeTrabajo', AreaDeTrabajoSchema, 'areas_de_trabajo');

module.exports = AreaDeTrabajo;
