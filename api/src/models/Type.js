const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('type', {
    id: { // INTEGER ´pero distinto al de la API
        type: DataTypes.INTEGER, // 1
        primaryKey: true,
        autoIncrement: true, // ++
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },   

  });
};
