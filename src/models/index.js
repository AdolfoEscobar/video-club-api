const Sequelize = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  port: config.port
});

const peliculaModel = require('./pelicula');
const directorModel = require('./director');
const generoModel = require('./genero');
const actorModel = require('./actor');
const peliculaActorModel = require('./peliculaActor');

const Pelicula = peliculaModel(sequelize, Sequelize);
const Director = directorModel(sequelize, Sequelize);
const Genero = generoModel(sequelize, Sequelize);
const Actor = actorModel(sequelize, Sequelize);
const PeliculaActor = peliculaActorModel(sequelize, Sequelize);

// Definir las asociaciones
Pelicula.belongsToMany(Actor, { through: PeliculaActor });
Actor.belongsToMany(Pelicula, { through: PeliculaActor });

Genero.hasMany(Pelicula);
Pelicula.belongsTo(Genero);

Director.hasMany(Pelicula);
Pelicula.belongsTo(Director);

// Sincronizar la base de datos
async function syncDatabase() {
    try {
        // Desactivar verificación de claves foráneas temporalmente
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

        // Eliminar tablas en orden inverso
        await Promise.all([
            sequelize.query('DROP TABLE IF EXISTS PeliculaActors'),
            sequelize.query('DROP TABLE IF EXISTS Peliculas'),
            sequelize.query('DROP TABLE IF EXISTS Actors'),
            sequelize.query('DROP TABLE IF EXISTS Directors'),
            sequelize.query('DROP TABLE IF EXISTS Generos')
        ]);

        // Reactivar verificación de claves foráneas
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

        // Crear tablas en orden
        await Genero.sync({ force: true });
        await Director.sync({ force: true });
        await Actor.sync({ force: true });
        await Pelicula.sync({ force: true });
        await PeliculaActor.sync({ force: true });

        console.log('Tablas sincronizadas correctamente');
    } catch (error) {
        console.error('Error al sincronizar las tablas:', error);
    }
}

// Llamar a la función de sincronización
syncDatabase();

// Exportar los modelos y sequelize
module.exports = {
  sequelize,
  Sequelize,
  Pelicula,
  Director,
  Genero,
  Actor,
  PeliculaActor
};
