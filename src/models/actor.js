module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Actor', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};

