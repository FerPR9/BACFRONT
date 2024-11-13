const Conferencia = require("../models/Conferencia");

// Crear una conferencia
exports.crearConferencia = async (req, res) => {
    try {
        let conferencia = new Conferencia(req.body);
        await conferencia.save();
        res.send(conferencia);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Obtener todas las conferencias
exports.obtenerConferencias = async (req, res) => {
    try {
        const conferencias = await Conferencia.find();
        res.json(conferencias);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Obtener una conferencia por ID
exports.obtenerConferencia = async (req, res) => {
    try {
        const { id } = req.params;
        const conferencia = await Conferencia.findById(id);
        if (!conferencia) {
            return res.status(404).send('Conferencia no encontrada');
        }
        res.send(conferencia);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Actualizar una conferencia
exports.actualizarConferencia = async (req, res) => {
    try {
        const { id } = req.params;
        const conferenciaActualizada = await Conferencia.findByIdAndUpdate(id, req.body, { new: true });
        if (!conferenciaActualizada) {
            return res.status(404).send('Conferencia no encontrada');
        }
        res.send(conferenciaActualizada);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// Eliminar una conferencia
exports.eliminarConferencia = async (req, res) => {
    try {
        const { id } = req.params;
        const conferenciaEliminada = await Conferencia.findByIdAndDelete(id);
        if (!conferenciaEliminada) {
            return res.status(404).send('Conferencia no encontrada');
        }
        res.send({ message: 'Conferencia eliminada correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

