const { Actor, Pelicula } = require('../models');

exports.crearActor = async (req, res) => {
    try {
        const nuevoActor = await Actor.create(req.body);
        res.status(201).json(nuevoActor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.obtenerActores = async (req, res) => {
    try {
        const actores = await Actor.findAll({
            include: [{ model: Pelicula, as: 'peliculas' }]
        });
        res.json(actores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.obtenerActor = async (req, res) => {
    try {
        const actor = await Actor.findByPk(req.params.id, {
            include: [{ model: Pelicula, as: 'peliculas' }]
        });
        if (actor) {
            res.json(actor);
        } else {
            res.status(404).json({ message: 'Actor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.actualizarActor = async (req, res) => {
    try {
        const actor = await Actor.findByPk(req.params.id);
        if (actor) {
            await actor.update(req.body);
            res.json(actor);
        } else {
            res.status(404).json({ message: 'Actor no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.eliminarActor = async (req, res) => {
    try {
        const actor = await Actor.findByPk(req.params.id);
        if (actor) {
            await actor.destroy();
            res.json({ message: 'Actor eliminado' });
        } else {
            res.status(404).json({ message: 'Actor no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

