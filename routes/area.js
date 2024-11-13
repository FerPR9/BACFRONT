// routes/area.js
var express = require("express");
var router = express.Router();
const areasTrabajoController = require('../controllers/areasTrabajoController');

router.get('/areas', areasTrabajoController.obtenerAreaDeTrabajo);

module.exports = router;



