const express = require('express');
const router = express.Router();
const peliculaController = require('../controllers/peliculaController');

router.post('/', peliculaController.crearPelicula);
router.get('/', peliculaController.obtenerPeliculas);
router.get('/:id', peliculaController.obtenerPelicula);
router.put('/:id', peliculaController.actualizarPelicula);
router.delete('/:id', peliculaController.eliminarPelicula);
router.post('/:peliculaId/actores/:actorId', peliculaController.agregarActorAPelicula);
router.delete('/:peliculaId/actores/:actorId', peliculaController.eliminarActorDePelicula);

module.exports = router;
