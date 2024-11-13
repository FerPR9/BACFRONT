/*const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Conferencia = require('../models/Conferencia');
const Taller = require('../models/Taller');
const Registro = require('../models/Registro');

// Configuración inicial para conectar a MongoDB
beforeAll(async () => {
  const uri = process.env.MONGODB_URL;
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Conectado a MongoDB para las pruebas');
});

describe('Pruebas para el endpoint /conferencia', () => {
  let conferenciaId;

  beforeEach(async () => {
    await Conferencia.deleteMany({});
  });

  it('Debería obtener todas las conferencias', async () => {
    const conferencia = [
      { nombreConferencia: 'Test1', nombreConferencista: 'Conferencista1', fechaConferencia: new Date(), lugarConferencia: 'Lugar de Prueba 1', cupoConferencia: 50, fotoConferencista: 'foto1.jpg', experienciaConferencista: 'Experiencia de prueba 1' },
      { nombreConferencia: 'Test2', nombreConferencista: 'Conferencista2', fechaConferencia: new Date(), lugarConferencia: 'Lugar de Prueba 2', cupoConferencia: 100, fotoConferencista: 'foto2.jpg', experienciaConferencista: 'Experiencia de prueba 2' }
    ];
    await Conferencia.insertMany(conferencia);

    const response = await request(app).get('/conferencia');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(conferencia.length);
    expect(response.body[0].nombreConferencia).toBe(conferencia[0].nombreConferencia);
  });

  it('Debería crear una nueva conferencia', async () => {
    const nuevaConferencia = {
      nombreConferencia: 'Nueva Conferencia',
      nombreConferencista: 'Conferencista3',
      fechaConferencia: new Date(),
      lugarConferencia: 'Lugar de Prueba 3',
      cupoConferencia: 30,
      fotoConferencista: 'foto3.jpg',
      experienciaConferencista: 'Experiencia de prueba 3'
    };

    const response = await request(app).post('/conferencia').send(nuevaConferencia);
    expect(response.status).toBe(200);
    expect(response.body.nombreConferencia).toBe(nuevaConferencia.nombreConferencia);
    conferenciaId = response.body._id;
  });

  it('Debería actualizar una conferencia existente', async () => {
    const conferenciaExistente = await Conferencia.create({
      nombreConferencia: 'Conferencia Original',
      nombreConferencista: 'Conferencista Original',
      fechaConferencia: new Date(),
      lugarConferencia: 'Lugar Original',
      cupoConferencia: 20,
      fotoConferencista: 'fotoOriginal.jpg',
      experienciaConferencista: 'Experiencia Original'
    });

    const conferenciaActualizada = { nombreConferencia: 'Conferencia Actualizada', cupoConferencia: 100 };

    const response = await request(app)
      .put(`/conferencia/${conferenciaExistente._id}`)
      .send(conferenciaActualizada);

    expect(response.status).toBe(200);
    expect(response.body.nombreConferencia).toBe(conferenciaActualizada.nombreConferencia);
    expect(response.body.cupoConferencia).toBe(conferenciaActualizada.cupoConferencia);
  }, 30000);

  it('Debería eliminar una conferencia existente', async () => {
    const conferenciaParaEliminar = await Conferencia.create({
      nombreConferencia: 'Conferencia para Eliminar',
      nombreConferencista: 'Conferencista para Eliminar',
      fechaConferencia: new Date(),
      lugarConferencia: 'Lugar para Eliminar',
      cupoConferencia: 10,
      fotoConferencista: 'fotoEliminar.jpg',
      experienciaConferencista: 'Experiencia para Eliminar'
    });

    const response = await request(app).delete(`/conferencia/${conferenciaParaEliminar._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Conferencia eliminada correctamente');
  }, 30000);
});

describe('Pruebas para el endpoint /taller', () => {
  let tallerId;

  beforeEach(async () => {
    await Taller.deleteMany({});
  });

  it('Debería obtener todos los talleres', async () => {
    const talleres = [
      { nombreTaller: 'Taller Test1', nombreResponsable: 'Responsable1', fechaTaller: new Date(), lugarTaller: 'Lugar de Prueba 1', cupoTaller: 30, fotoResponsableTaller: 'foto1.jpg', experienciaResponsableTaller: 'Experiencia de prueba 1' },
      { nombreTaller: 'Taller Test2', nombreResponsable: 'Responsable2', fechaTaller: new Date(), lugarTaller: 'Lugar de Prueba 2', cupoTaller: 50, fotoResponsableTaller: 'foto2.jpg', experienciaResponsableTaller: 'Experiencia de prueba 2' }
    ];
    await Taller.insertMany(talleres);

    const response = await request(app).get('/taller');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(talleres.length);
    expect(response.body[0].nombreTaller).toBe(talleres[0].nombreTaller);
  });

  it('Debería crear un nuevo taller', async () => {
    const nuevoTaller = {
      nombreTaller: 'Nuevo Taller',
      nombreResponsable: 'Responsable3',
      fechaTaller: new Date(),
      lugarTaller: 'Lugar de Prueba 3',
      cupoTaller: 20,
      fotoResponsableTaller: 'foto3.jpg',
      experienciaResponsableTaller: 'Experiencia de prueba 3'
    };

    const response = await request(app).post('/taller').send(nuevoTaller);
    expect(response.status).toBe(200);
    expect(response.body.nombreTaller).toBe(nuevoTaller.nombreTaller);
    tallerId = response.body._id;
  });

  it('Debería actualizar un taller existente', async () => {
    const tallerExistente = await Taller.create({
      nombreTaller: 'Taller Original',
      nombreResponsable: 'Responsable Original',
      fechaTaller: new Date(),
      lugarTaller: 'Lugar Original',
      cupoTaller: 15,
      fotoResponsableTaller: 'fotoOriginal.jpg',
      experienciaResponsableTaller: 'Experiencia Original'
    });

    const tallerActualizado = { nombreTaller: 'Taller Actualizado', cupoTaller: 35 };

    const response = await request(app)
      .put(`/taller/${tallerExistente._id}`)
      .send(tallerActualizado);

    expect(response.status).toBe(200);
    expect(response.body.nombreTaller).toBe(tallerActualizado.nombreTaller);
    expect(response.body.cupoTaller).toBe(tallerActualizado.cupoTaller);
  }, 30000);

  it('Debería eliminar un taller existente', async () => {
    const tallerParaEliminar = await Taller.create({
      nombreTaller: 'Taller para Eliminar',
      nombreResponsable: 'Responsable para Eliminar',
      fechaTaller: new Date(),
      lugarTaller: 'Lugar para Eliminar',
      cupoTaller: 10,
      fotoResponsableTaller: 'fotoEliminar.jpg',
      experienciaResponsableTaller: 'Experiencia para Eliminar'
    });

    const response = await request(app).delete(`/taller/${tallerParaEliminar._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Taller eliminado correctamente');
  }, 30000);
});

describe('Pruebas para el endpoint /registro', () => {
  let registroId;

  beforeEach(async () => {
    await Registro.deleteMany({});
  });

  it('Debería obtener todos los registros', async () => {
    const registros = [
      { nombre: 'Juan Pérez', correoElectronico: 'juan@example.com', telefono: 123456789, areaTrabajo: 'Ventas', foto: 'foto1.jpg' },
      { nombre: 'Ana García', correoElectronico: 'ana@example.com', telefono: 987654321, areaTrabajo: 'Marketing', foto: 'foto2.jpg' },
    ];
    await Registro.insertMany(registros);

    const response = await request(app).get('/registro');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(registros.length);
    expect(response.body[0].nombre).toBe(registros[0].nombre);
  });

  it('Debería crear un nuevo registro', async () => {
    const nuevoRegistro = {
      nombre: 'Carlos Martínez',
      correoElectronico: 'carlos@example.com',
      telefono: 123987654,
      areaTrabajo: 'Tecnología',
      foto: 'foto3.jpg',
    };

    const response = await request(app).post('/registro').send(nuevoRegistro);
    expect(response.status).toBe(200);
    expect(response.body.nombre).toBe(nuevoRegistro.nombre);
    registroId = response.body._id;
  });

  it('Debería actualizar un registro existente', async () => {
    const registroExistente = await Registro.create({
      nombre: 'Registro Original',
      correoElectronico: 'original@example.com',
      telefono: 654987321,
      areaTrabajo: 'Soporte',
      foto: 'fotoOriginal.jpg',
    });

    const registroActualizado = { nombre: 'Registro Actualizado', telefono: 999888777 };

    const response = await request(app)
      .put(`/registro/${registroExistente._id}`)
      .send(registroActualizado);

    expect(response.status).toBe(200);
    expect(response.body.nombre).toBe(registroActualizado.nombre);
    expect(response.body.telefono).toBe(registroActualizado.telefono);
  });

  it('Debería eliminar un registro existente', async () => {
    const registroParaEliminar = await Registro.create({
      nombre: 'Carlos Martínez',
      correoElectronico: 'carlos@example.com',
      telefono: 123987654,
      areaTrabajo: 'Tecnología',
      foto: 'foto3.jpg'
    });

    const response = await request(app).delete(`/registro/${registroParaEliminar._id}`);
    expect(response.status).toBe(200);
    expect(response.body.msg).toBe('Registro eliminado correctamente');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  console.log('Conexión a MongoDB cerrada');
});
*/