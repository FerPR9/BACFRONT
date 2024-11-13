const Registro = require("../models/Registro");
const Conferencia = require("../models/Conferencia");
const Taller = require("../models/Taller");

exports.crearRegistro = async (req, res) => {
    console.log('Datos recibidos:', req.body);
    try {
        let registro = new Registro(req.body);
        await registro.save();

        // Actualizar el cupo de la conferencia o taller
        if (req.body.conferenciaId) {
            const conferencia = await Conferencia.findById(req.body.conferenciaId);
            if (conferencia && conferencia.cupoConferencia > 0) {
                conferencia.cupoConferencia -= 1;
                await conferencia.save();
            }
        } else if (req.body.tallerId) {
            const taller = await Taller.findById(req.body.tallerId);
            if (taller && taller.cupoTaller > 0) {
                taller.cupoTaller -= 1;
                await taller.save();
            }
        }

        res.send(registro);

    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};

exports.obtenerRegistros = async (req, res) => {
    try {
        const registros = await Registro.find();
        res.json(registros);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};

exports.actualizarRegistro = async (req, res) => {
    try {
        const { nombre, correoElectronico, telefono, areaTrabajo, foto } = req.body;
        let registro = await Registro.findById(req.params.id);

        if (!registro) {
            return res.status(404).json({ msg: 'No existe el registro' });
        }

        registro.nombre = nombre || registro.nombre;
        registro.correoElectronico = correoElectronico || registro.correoElectronico;
        registro.telefono = telefono || registro.telefono;
        registro.areaTrabajo = areaTrabajo || registro.areaTrabajo;
        registro.foto = foto || registro.foto;

        registro = await Registro.findByIdAndUpdate(req.params.id, registro, { new: true });
        res.json(registro);

    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};

exports.obtenerRegistro = async (req, res) => {
    try {
        let registro = await Registro.findById(req.params.id);

        if (!registro) {
            return res.status(404).json({ msg: 'No existe el registro' });
        }
        res.json(registro);

    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};

exports.eliminarRegistro = async (req, res) => {
    try {
        let registro = await Registro.findById(req.params.id);

        if (!registro) {
            return res.status(404).json({ msg: 'No existe el registro' });
        }
        await Registro.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Registro eliminado correctamente' });

    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};
