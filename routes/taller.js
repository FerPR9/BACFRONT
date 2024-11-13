var express = require('express');
var router = express.Router();

const tallerController = require('../controllers/tallerController');

// Rutas para talleres
router.post('/', tallerController.crearTaller);
router.get('/', tallerController.obtenerTalleres);
router.put('/:id', tallerController.actualizarTaller);
router.get('/:id', tallerController.obtenerTaller);
router.delete('/:id', tallerController.eliminarTaller);

module.exports = router;
