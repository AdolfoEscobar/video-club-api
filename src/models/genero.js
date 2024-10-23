module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Genero', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};

