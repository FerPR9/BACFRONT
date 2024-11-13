var express = require("express");
var router = express.Router();
let Registro = require('../models/Registro');
const registroController = require('../controllers/registroController')

//Listado de todos los productos
/*router.get("/", async function (req, res, next) {
  const resultado = await Registro.find();
  res.json(resultado);
});*/

//registro
router.post('/', registroController.crearRegistro);
router.get('/', registroController.obtenerRegistros);
router.put('/:id', registroController.actualizarRegistro);
router.get('/:id', registroController.obtenerRegistro);
router.delete('/:id', registroController.eliminarRegistro);

/*router.post("/", async function (req, res, next) {
  let producto = new productModel({
    "id": req.body.id,
    "name": req.body.name,
    "description": req.body.description,
    "price":req.body.price,
    "images":req.body.images
  });
  let result = await producto.save();
  res.json("Producto agregado");  
});

router.put("/:id", async function (req, res, next) {
  const filter = {id: req.query.id}; 
  const update = {name: req.query.name}; 
  const resultado = await productModel.findOneAndUpdate(filter, update, { new:true, upsert: true });
  res.json("Producto actualizado correctamente");
});

router.delete("/:id", async function (req, res, next) {
  const resul = await productModel.find({id: req.params.id}).exec();
  if (resul.length > 0) {
      await productModel.deleteOne({id: req.params.id});
      res.json("Producto eliminado correctamente");
  } else {
      res.json({error: "No se encontró el producto con Id " + req.params.id})
  }
});*/

module.exports = router;
