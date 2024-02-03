const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Ejemplo: const authRouter = require('./auth.js');
//const {getAll, getById, getGenres, postNewVideogameBD, get15ByName, chequeoAllVideogsInDB } = require("../controllers/index.js");
//const {getAll, getById, getGenres, postNewVideogameBD, get15ByName, chequeoAllVideogsInDB, chequeoIntermadiateTable } = require("../controllers/index.js");
const {getAll, getById, getTypes, postNewPokemonBD, deletePok}= require("../controllers/index.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

/***📍 GET | /pokemons**
-  Obtiene un arreglo de objetos, donde cada objeto es un videojuego con su información.
*/
//router.get("/videogames", getAll); //en esta ruta q viene x GET respondo ejecutando getAll
router.get("/pokemons", getAll); // trae los 12 primeros o busca x name /?name=""
router.get("/pokemons/:idPokemon", getById); //busca x id

router.get("/types", getTypes);
router.post("/pokemons", postNewPokemonBD); 

router.delete("/delete/:name", deletePok);


module.exports = router;

/*
-  [**PokeApi**](https://pokeapi.co/api/v2/pokemon)
-  **Por id**: _"https://pokeapi.co/api/v2/pokemon/{id}"_
-  **Por nombre**: _"https://pokeapi.co/api/v2/pokemon/{name}"_
-  **Por tipo**: _"https://pokeapi.co/api/v2/type"_ 

#### **📍 GET | /pokemons/:idPokemon**

-  Esta ruta obtiene el detalle de un pokemon específico. Es decir que devuelve un objeto con la información pedida en el detalle de un pokemon.
-  El pokemon es recibido por parámetro (ID).
-  Tiene que incluir los datos del tipo de pokemon al que está asociado.
-  Debe funcionar tanto para los pokemones de la API como para los de la base de datos.

#### **📍 GET | /pokemons/name?="..."**

-  Esta ruta debe obtener todos aquellos pokemons que coinciden con el nombre recibido por query.
-  Debe poder buscarlo independientemente de mayúsculas o minúsculas.
-  Si no existe el pokemon, debe mostrar un mensaje adecuado.
-  Debe buscar tanto los de la API como los de la base de datos.

#### **📍 POST | /pokemons**

-  Esta ruta recibirá todos los datos necesarios para crear un pokemon y relacionarlo con sus tipos solicitados.
-  Toda la información debe ser recibida por body.
-  Debe crear un pokemon en la base de datos, y este debe estar relacionado con sus tipos indicados (debe poder relacionarse al menos con dos).
*/

/*
#### **📍 GET | /types**

-  Obtiene un arreglo con todos los tipos de pokemones.
-  En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los tipos que encuentres en la API.
-  Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.



*/






