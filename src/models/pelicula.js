module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pelicula', {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        anio: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
};

