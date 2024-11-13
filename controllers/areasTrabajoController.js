// controllers/areasTrabajoController.js
const AreaDeTrabajo = require('../models/AreaDeTrabajo');

exports.obtenerAreaDeTrabajo = async (req, res) => {
    try {
        const resultado = await AreaDeTrabajo.findOne(); // Encuentra el primer documento
        console.log('Resultado:', resultado); // Imprime el resultado para depuración
        if (resultado && resultado.areas_de_trabajo) {
            console.log('Enviando áreas de trabajo:', resultado.areas_de_trabajo);
            res.status(200).json(resultado.areas_de_trabajo); // Envía el array de áreas de trabajo
        } else {
            console.log('No se encontraron áreas de trabajo');
            res.status(404).send('No se encontraron áreas de trabajos');
        }
    } catch (err) {
        console.error('Error al obtener áreas de trabajo:', err);
        res.status(500).send(err);
    }
};




