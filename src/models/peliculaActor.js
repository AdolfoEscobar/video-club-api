module.exports = (sequelize, DataTypes) => {
    return sequelize.define('PeliculaActor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        PeliculaId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Peliculas',
                key: 'id'
            }
        },
        ActorId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Actors',
                key: 'id'
            }
        }
    }, {
        tableName: 'PeliculaActors',
        timestamps: true
    });
};

