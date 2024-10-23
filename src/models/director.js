module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Director', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};

