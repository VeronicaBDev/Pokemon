const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  /*
  -  ID.
-  Nombre.
-  Imagen.
-  Vida.
-  Ataque.
-  Defensa.
-  Velocidad (si tiene).
-  Altura (si tiene).
-  Peso (si tiene).
-  Tipo.  
  */
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID, // "123n123-124n1243-1243n12"
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // algoritmo que genera uuids
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      /*
      validate: {
        isUrl: false,  
      }*/
      //"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/595.png"
    },   

    life:{
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 201 // para usar number js
      },
      allowNull: false,  
    }, 
    attack:{
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 200 // para usar number js
      },
      allowNull: false,  
    }, 
    defense:{
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 200// para usar number js
      },
      allowNull: false,  
    },
    speed:{
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 200 // para usar number js
      },
      allowNull: true,  
    },  
    height:{
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 200 // para usar number js
      },
      allowNull: true,  
    }, 
    weight:{
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 200 // para usar number js
      },
      allowNull: true,  
    }
    /*
    platforms: { //[]
      type: DataTypes.JSON,
      allowNull: false,
    },
    */

  });
};