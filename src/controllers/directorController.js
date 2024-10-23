const { Director, Pelicula } = require('../models');

exports.crearDirector = async (req, res) => {
    try {
        const nuevoDirector = await Director.create(req.body);
        res.status(201).json(nuevoDirector);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.obtenerDirectores = async (req, res) => {
    try {
        const directores = await Director.findAll({
            include: [{ model: Pelicula, as: 'peliculas' }]
        });
        res.json(directores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.obtenerDirector = async (req, res) => {
    try {
        const director = await Director.findByPk(req.params.id, {
            include: [{ model: Pelicula, as: 'peliculas' }]
        });
        if (director) {
            res.json(director);
        } else {
            res.status(404).json({ message: 'Director no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.actualizarDirector = async (req, res) => {
    try {
        const director = await Director.findByPk(req.params.id);
        if (director) {
            await director.update(req.body);
            res.json(director);
        } else {
            res.status(404).json({ message: 'Director no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.eliminarDirector = async (req, res) => {
    try {
        const director = await Director.findByPk(req.params.id);
        if (director) {
            await director.destroy();
            res.json({ message: 'Director eliminado' });
        } else {
            res.status(404).json({ message: 'Director no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

