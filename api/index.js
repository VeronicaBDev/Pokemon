const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
//force: true (x def false) true solo para desarr asi cada vez 
  //q inicializo el servid. borra las tablas y la info q contienen 
  //y crea los modelos desde cero
  //alter:true para que cambie solo los datos que modificque. OJO si cambio los campos de los modelos se puede complicar con alter

  //conn.sync({ alter:true }).then(() => { //c
  conn.sync({ alter:true }).then(() => { //c
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
