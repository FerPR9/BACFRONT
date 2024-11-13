const Taller = require("../models/Taller");

// Crear un taller
exports.crearTaller = async (req, res) => {
    try {
        let taller = new Taller(req.body);
        await taller.save();
        res.send(taller);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Obtener todos los talleres
exports.obtenerTalleres = async (req, res) => {
    try {
        const talleres = await Taller.find();
        res.json(talleres);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Actualizar un taller
exports.actualizarTaller = async (req, res) => {
    try {
        const { id } = req.params;
        const tallerActualizado = await Taller.findByIdAndUpdate(id, req.body, { new: true });
        if (!tallerActualizado) {
            return res.status(404).send('Taller no encontrado');
        }
        res.send(tallerActualizado);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Obtener un taller por ID
exports.obtenerTaller = async (req, res) => {
    try {
        const { id } = req.params;
        const taller = await Taller.findById(id);
        if (!taller) {
            return res.status(404).send('Taller no encontrado');
        }
        res.send(taller);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Eliminar un taller
exports.eliminarTaller = async (req, res) => {
    try {
        const { id } = req.params;
        const tallerEliminado = await Taller.findByIdAndDelete(id);
        if (!tallerEliminado) {
            return res.status(404).send('Taller no encontrado');
        }
        res.send({ message: 'Taller eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
