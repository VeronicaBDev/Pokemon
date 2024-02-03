//VER FIND OR CREATE

const axios = require("axios");
const { Pokemon, Type } = require("../db");
const { Op } = require("sequelize");

//const URL = "https://api.rawg.io/api/games?key=4459e141da8d4958ab7cc1b2d227d77a";

/*
    ID.
-  Nombre.
-  Imagen.
-  Vida.
-  Ataques.
-  Defensa.
-  Velocidad.
- Altura
-  Peso.*/
/*
/*
#### **📍 GET | /pokemons/:idPokemon**

-  Esta ruta obtiene el detalle de un pokemon específico. Es decir que devuelve un objeto con la información pedida en el detalle de un pokemon.
-  El pokemon es recibido por parámetro (ID).
-  Tiene que incluir los datos del tipo de pokemon al que está asociado.
-  Debe funcionar tanto para los pokemones de la API como para los de la base de datos.
*/

/*https://pokeapi.co/api/v2/type
#### **📍 GET | /types**

-  Obtiene un arreglo con todos los tipos de pokemones.
-  En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los tipos que encuentres en la API.
-  Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.
*/
async function getAllName(name) {
  const allPok = await Pokemon.findAll({
    where: {name: name},
    //include: [{model: Type}]
  })
  //console.log(allPok)
  return allPok
}

const getAllDbOKforCards = async () => {
  let allObjOKtoCards = "no se pudo obtener la info de la BD"  
      const responseDB = await Pokemon.findAll({            
        include: [{model: Type}]    
      })
      if(responseDB){
        //console.log(responseDB)
        allObjOKtoCards = []
        
        responseDB.forEach(element => { 
          console.log(element.dataValues.name)          
          //allObjOKtoCards.push(objBD);  
          console.log(element.dataValues.types.length)
          let arrTypes = []
          if(element.dataValues.types.length > 0){         
            element.dataValues.types.forEach(el =>{
              //console.log(el.name)
              arrTypes.push(el.name)
            })           
          }
          objBD = {name: element.dataValues.name, image: element.dataValues.image, type: arrTypes}
          allObjOKtoCards.push(objBD)
          //console.log(allObjOKtoCards)     
        })       
      }
      console.log(allObjOKtoCards)  
      return allObjOKtoCards
    }
//console.log('getAllDbOKforCards():')

async function getOneApi(urlOnePok){
const resp = await axios.get(urlOnePok)
const dataOnePok = resp.data; 

//objAPI.name = elem.name;
let objAPI = {} 
if(dataOnePok){   
           
  let typesArr = []
  dataOnePok.types.forEach(element => {
      typesArr.push(element.type.name);
  });
  
  let URLimageOnePok = dataOnePok.sprites.other.home.front_default;

  objAPI.id = dataOnePok.id    

  objAPI.name = dataOnePok.name        
  objAPI.image = URLimageOnePok          
  objAPI.type = typesArr  
  objAPI.attack =  dataOnePok.stats[1].base_stat

  //console.log(objAPI)
  return objAPI
}

}

//console.log('onepok');
//console.log(getOneApi("https://pokeapi.co/api/v2/pokemon/555"))


async function getAllApiOKforCards(){
      
      const URL = "https://pokeapi.co/api/v2/pokemon?offset=&limit=242"; //limit=1292"
      

      const response = await axios.get(URL)
      data = response.data.results; //  data = response.data; .data era para la otra API, en esta es data.results
      
      // 12 sigtes: https://pokeapi.co/api/v2/pokemon?offset=12&limit=12 offset +12
      let allObjOKtoCards =[]
      if (data){
        
        poks_api = data;
        //const allObjOKtoCards =[]
        //poks_api.forEach( async (elem) =>{
          const promises = poks_api.map( async (elem)=>{
            const urlOnePok = elem.url; // el url del pokemon  
           const onePok = await getOneApi (urlOnePok)   
           return onePok
        })   
        allObjOKtoCards = await Promise.all(promises)
        //console.log(allObjOKtoCards)
        return allObjOKtoCards  
      }
      //console.log(allObjOKtoCards)
      
      
   
}

//console.log('getAllApiOKforCards():!!!!!!!!!!!')
///console.log(getAllApiOKforCards(0))
  
 
async function getDBbyName (nameToSearch){ //ret {} si no encuentra ó {lleno}
  //const nameLowercase = nameToSearch.toLowerCase()
  //console.log('lowerC:'+ nameLowercase)
  const searchedPok = await Pokemon.findOne({// null si no encuentra
    where :{
      name:{[ Op.iLike ]:'%'+nameToSearch}
    },
    include: [{model: Type}]
    })
  let objToR = {}
  typesArr = []
  if(searchedPok){
    searchedPok.dataValues.types.forEach(element => {
      typesArr.push(element.name);
    });


    const { id, name, image, life, attack, defense, speed, height, weight} = searchedPok.dataValues;
    //si quiero q reotrne TODOS los campos (para Detail):
    //objToR= { name, image, life, attack, defense, speed, height, weight, types: typesArr};
    objToR= { id, name, image, type: typesArr};
    
  }
  //console.log(objToR)
  return objToR
}

async function getAll(req, res) { // /pokemons
     
let all = []   


/***📍 GET | router.get("/pokemons", getAll); 
-  Obtiene un arreglo de objetos, donde cada objeto es un videojuego con su información.
*/

  const {name} = req.query;  
  
  if(!name){ // / todos los pokemons (no uno x name)   
   
   
      try{    
  // cargo los poksde la API:
        const pokesAPI = await getAllApiOKforCards();
       //all = [...all, ...pokesAPI] // caso los de DB al ppio
       all = [...pokesAPI]
  // // cargo los poksde la BD:
        let allObjOKtoCards = "no se pudo obtener la info de la BD"  
        const responseDB = await Pokemon.findAll({            
          include: [{model: Type}]    
        })
        if(responseDB){
          console.log(responseDB)
          allObjOKtoCards = []
          
          responseDB.forEach(element => { 
            //console.log(element.dataValues.name)          
           
            //console.log(element.dataValues.types.length)
            let arrTypes = []
            if(element.dataValues.types.length > 0){         
              element.dataValues.types.forEach(el =>{
                //console.log(el.name)
                arrTypes.push(el.name)
              })           
            }
            objBD = {id: element.id, name: element.dataValues.name, image: element.dataValues.image, type: arrTypes, attack: element.dataValues.attack}
            allObjOKtoCards.push(objBD)
            //console.log(allObjOKtoCards)     
          })       
        }
        //console.log(allObjOKtoCards)  
        //all = [...allObjOKtoCards, ...pokesAPI]; para caso d q quiera poner el de DB al ppio
        all = [...all, ...allObjOKtoCards]
        
        res.status(200).json(all)      
        
        }catch(error){              
          //res.status(550).json('Error 550 No se encontraron los pokemons: Error Message:' + error.message);        
        }
///////////////////////////////////////////////////   
  }else{ //busca x name   
      
      try{  
    
          URLbyNameAPI = "https://pokeapi.co/api/v2/pokemon/" + name;  
          const response = await axios.get(URLbyNameAPI)
            data = response.data; 

            typesArr = []
            data.types.forEach(element => {
                typesArr.push(element.type.name);
            });
            const id = data.id;
            //const URLimageByName = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+id+'.png';
            const URLimageByName = data.sprites.other.home.front_default;  

            const objToResponse = {
                id: id,

                name: data.name,
                image: URLimageByName,
                type: typesArr, //[]
            }
            //si encuentrea lo guardo al {} en un array
            let arrOneObjtoR =[]
            arrOneObjtoR.push(objToResponse) 
            res.status(200).json(arrOneObjtoR)            
            
      }catch(error){  
        // para alert en actions sea x server failed o si no existe ese pok
      }  
    ////////////pruebo en DB
      try{
        
          console.log ('242')
          const objToResponseDB = await getDBbyName(name) // trae {} o lleno si encuentra

          console.log ('objToResponseDB')
          console.log (objToResponseDB)
           //lo guardo en un array
           let arrOneObjtoRDB =[]
           arrOneObjtoRDB.push(objToResponseDB) 
           console.log(arrOneObjtoRDB)
           //res.status(200).json(ObjtoRDB)

          arrOneObjtoRDB[0].name
          ?res.status(200).json(arrOneObjtoRDB) // [{lleno}]
          :res.status(406).json(arrOneObjtoRDB) //[{}]
          //:res.status(406).json("No EXISTE el pokemon: " + name + " ni en API ni en db. Error Message: No es error de servidor");

        }catch(error){  
          //alert("Consulta fallida a DB. Reintente: " + name +"Error Message:" + error.message);
        }
               
  }     
}

// OK getTypes 
async function getTypes(req, res) { // /types de la API
    const URLtypes = 'https://pokeapi.co/api/v2/type';   
    const typesAPI = []; // son 20
    
    try{    
      const response = await axios.get(URLtypes)
      data = response.data.results; 
      data.forEach(obj => {
        typesAPI.push({name: obj.name}); //[]          
      });
      console.log(typesAPI)
      //ingreso los generos a la BD
      const typesInBD = await Type.bulkCreate(typesAPI);
  
      typesInBD
      //? res.status(200).json('Se ingresaron a la BD ' + typesInBD.length + ' types (registros).')
      ? res.status(200).json(typesInBD)
      : res.status(404).json('Not found'); // este error no funciona, nunca responde x aqui
    }catch(error){      
      
      res.status(550).json('Error 550 No se pudieron ingresar typos a la BD: Error Message:' + error.message);
      
    }
  }
 


// OK getById return obj listo para Detail, sea de DB o API
async function getById(req, res){ // /pokemons/algo : pedido en fc de si algo es INT => API, si es STR => DB    
    const {idPokemon} = req.params;

    if(!isNaN(idPokemon)){ // si es un nro, solicitud a API. LO TRAE listo para Detail
        try{    
            const response = await axios.get("https://pokeapi.co/api/v2/pokemon/" + idPokemon)
            data = response.data; 

            typesArr = []
            data.types.forEach(element => {
                typesArr.push(element.type.name);
            });
            const id = data.id;
            const URLimageById = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+idPokemon+'.png';
            
            let life = "";  //hp
            let attack = ""; 
            let defense = ""; 
            let speed = ""; 
            let height = ""; 
            let weight = ""; 

            if(data.height) height = data.height; // 1 equivale a 0.1m
            if(data.weight) weight = data.weight; // (1 equivale a 0.1kg)

            for (let index = 0; index < data.stats.length; index++) {
              const element = data.stats[index];
              if (element.stat.name === 'hp') life = element.base_stat;
              if (element.stat.name === 'attack') attack = element.base_stat;
              if (element.stat.name === 'defense') defense = element.base_stat;
              if (element.stat.name === 'speed') speed = element.base_stat;
            }
              
            const objToResponse = {
                id: idPokemon,
                name: data.name,
                image: URLimageById,
                life: life, //HP string vacio o num
                attack: attack, //string vacio o num
                defense: defense, //string vacio o num
                speed: speed, //si tiene. string vacio o num
                height: height,//si tiene. string vacio o num
                weight: weight,//si tiene. string vacio o num
                type: typesArr     
            }
            data
            //? res.status(200).json(ob)
            ? res.status(200).json(objToResponse)
            : res.status(404).json('Not found!!!!'); // este error no funciona, nunca responde x aqui
        }catch(error){      
                
            res.status(550).json([]);        
        }
    }else{ // solicitud DB. Lo trae listo para Detail
      try{
        const searchedPok = await Pokemon.findOne({ 
          where: {id: idPokemon},
          include: [{model: Type}]
        })  
        console.log('searchedPok') 
        console.log(searchedPok)   
        typesArr = []
          searchedPok.types.forEach(element => {
            typesArr.push(element.name);
          });
          console.log(typesArr)
          const { name, image, life, attack, defense, speed, height, weight} = searchedPok;
          objToR= { name, image, life, attack, defense, speed, height, weight, type: typesArr};
        
        //searchedPok
          res.status(200).json(objToR)
          console.log('linea 374 controllers getById para Detail Obj:')
          console.log(objToR)
      }catch(error){    
        //alert('No existe el Pokemon de nombre ' + element.id + ', ni en BD ni en API')
        res.status(550).json([]);        
                
      //res.status(550).json("Error 550 No se encontró el pokemon id: " + idPokemon +"Error Message:" + error.message);        
      }
    }
}


/*#### **📍 POST | /pokemons**
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

-  Esta ruta recibirá todos los datos necesarios para crear un pokemon y relacionarlo con sus tipos solicitados.
-  Toda la información debe ser recibida por body.
-  Debe crear un pokemon en la base de datos, y este debe estar relacionado con sus tipos indicados 
(debe poder relacionarse al menos con dos).
*/
/*
// OK post return 

// lo guarda tal como viene : mayusc/min*/
// cdo busca para crearlo o no crearlo si ya existe, lo busca case insensitive
async function postNewPokemonBD(req, res) { // crea el nuevo video en BD y le asocia los generos en la tabla interm
  const { name, image, life, attack, defense, speed, height, weight, type } = req.body; //types: []
      
    if (!name || !image || !life || !attack || !defense || type.length < 2) return res.status(400).json({ error: 'Información incompleta' })
    // allowNull false da error si "" o null
    
    try{    
      const nameToLowerCase = name.toLowerCase()      
      
      let [newPokemon, created] = await Pokemon.findOrCreate({
        //where: { name: name },
        where :{
          name:{[ Op.iLike ]:'%'+nameToLowerCase}
        },
        defaults: { name: nameToLowerCase, image, life, attack, defense, speed, height, weight },
        include: [{model: Type}] // si ya existía lo trae con types (ya no es necesario)
      });

      if(created){      
        type.forEach(async typeStr =>{                  
          let typeDB= await Type.findOne({ where: {name: typeStr} });
          await newPokemon.addType(typeDB);  // asocié al nuevo videogame los generos     
          //alert('Fue creado el nuevo pokemon Name: ' + name)     
        })    
        /*
        const regex = /^[0-9]*$/;
        if(regex.test(newPokemon.id[0])){ // true si primer char es num
          let pokeToDelete = await Pokemon.findOne({ where: {name: name} });       
          await pokeToDelete.destroy();
        */
        return res.status(200).send('Fue creado el nuevo pokemon Name: ' + name); 
      }else{        
        //si no fue creado
        return res.status(402).json({ error: error.message }); // para alert en action
      }  
      
    }catch(error){
       //si ya existe
      return res.status(401).json({ error: error.message })// para alert en action
    }      
  };


  async function deletePok(req, res) { // 
    const name = req.params.name; //   
    console.log('controller Name:' +name)  
    const nameToLowercase = name.toLowerCase()        
    try{
      let pokeToDelete = await Pokemon.findOne({ where: {name: nameToLowercase} });       
      await pokeToDelete.destroy();
      return res.status(200).json('eliminado' + name);  
    }catch(error) {
      return res.status(200).json(error);  

    }
      
  }
  

module.exports = { getAll, getById, getTypes, postNewPokemonBD , deletePok};
