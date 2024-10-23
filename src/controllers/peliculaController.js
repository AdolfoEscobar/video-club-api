const { Pelicula, Director, Genero, Actor } = require('../models');

exports.crearPelicula = async (req, res) => {
    try {
        const nuevaPelicula = await Pelicula.create(req.body);
        res.status(201).json(nuevaPelicula);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.obtenerPeliculas = async (req, res) => {
    try {
        const peliculas = await Pelicula.findAll({
            include: [
                { model: Director, as: 'director' },
                { model: Genero, as: 'genero' },
                { model: Actor, as: 'actores' }
            ]
        });
        res.json(peliculas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.obtenerPelicula = async (req, res) => {
    try {
        const pelicula = await Pelicula.findByPk(req.params.id, {
            include: [
                { model: Director, as: 'director' },
                { model: Genero, as: 'genero' },
                { model: Actor, as: 'actores' }
            ]
        });
        if (pelicula) {
            res.json(pelicula);
        } else {
            res.status(404).json({ message: 'Película no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.actualizarPelicula = async (req, res) => {
    try {
        const pelicula = await Pelicula.findByPk(req.params.id);
        if (pelicula) {
            await pelicula.update(req.body);
            res.json(pelicula);
        } else {
            res.status(404).json({ message: 'Película no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.eliminarPelicula = async (req, res) => {
    try {
        const pelicula = await Pelicula.findByPk(req.params.id);
        if (pelicula) {
            await pelicula.destroy();
            res.json({ message: 'Película eliminada' });
        } else {
            res.status(404).json({ message: 'Película no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.agregarActorAPelicula = async (req, res) => {
    try {
        const pelicula = await Pelicula.findByPk(req.params.peliculaId);
        const actor = await Actor.findByPk(req.params.actorId);
        if (pelicula && actor) {
            await pelicula.addActor(actor);
            res.json({ message: 'Actor agregado a la película' });
        } else {
            res.status(404).json({ message: 'Película o actor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.eliminarActorDePelicula = async (req, res) => {
    try {
        const pelicula = await Pelicula.findByPk(req.params.peliculaId);
        const actor = await Actor.findByPk(req.params.actorId);
        if (pelicula && actor) {
            await pelicula.removeActor(actor);
            res.json({ message: 'Actor eliminado de la película' });
        } else {
            res.status(404).json({ message: 'Película o actor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
