const { Genero, Pelicula } = require('../models');

exports.crearGenero = async (req, res) => {
    try {
        const nuevoGenero = await Genero.create(req.body);
        res.status(201).json(nuevoGenero);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.obtenerGeneros = async (req, res) => {
    try {
        const generos = await Genero.findAll({
            include: [{ model: Pelicula, as: 'peliculas' }]
        });
        res.json(generos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.obtenerGenero = async (req, res) => {
    try {
        const genero = await Genero.findByPk(req.params.id, {
            include: [{ model: Pelicula, as: 'peliculas' }]
        });
        if (genero) {
            res.json(genero);
        } else {
            res.status(404).json({ message: 'Género no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.actualizarGenero = async (req, res) => {
    try {
        const genero = await Genero.findByPk(req.params.id);
        if (genero) {
            await genero.update(req.body);
            res.json(genero);
        } else {
            res.status(404).json({ message: 'Género no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.eliminarGenero = async (req, res) => {
    try {
        const genero = await Genero.findByPk(req.params.id);
        if (genero) {
            await genero.destroy();
            res.json({ message: 'Género eliminado' });
        } else {
            res.status(404).json({ message: 'Género no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

