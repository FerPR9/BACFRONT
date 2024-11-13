var express = require('express');
var router = express.Router();

const conferenciaController = require('../controllers/conferenciaController');

// Rutas para conferencias
router.post('/', conferenciaController.crearConferencia);
router.get('/', conferenciaController.obtenerConferencias);
router.put('/:id', conferenciaController.actualizarConferencia);
router.get('/:id', conferenciaController.obtenerConferencia);
router.delete('/:id', conferenciaController.eliminarConferencia);

module.exports = router;
