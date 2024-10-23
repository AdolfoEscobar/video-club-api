const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actorController');

router.post('/', actorController.crearActor);
router.get('/', actorController.obtenerActores);
router.get('/:id', actorController.obtenerActor);
router.put('/:id', actorController.actualizarActor);
router.delete('/:id', actorController.eliminarActor);

module.exports = router;

