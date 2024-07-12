// src/server.js
/**
 * Punto principal de acceso al servidor
 */

//1- Importamos express
const express = require('express');

//2- Instanciamos express
const app = express();

//3- Importamos el módulo turismoRoutes (se lo diseñará a futuro)
const atraccionRouter = require('../routes/atraccionRouter');
const mensajeRouter = require('../routes/mensajeRouter');
const provinciaRouter = require('../routes/provinciaRouter');
const turistaRouter = require('../routes/turistaRouter');

//4- Declaramos el puerto
const PORT = 3000;

//5- Uso del middleware .json que convierte el cuerpo de solicitud
// en algo accesible por js
app.use(express.json());

//6- Prefijo principal de las rutas y delegación de las sub-rutas
app.use('/atraccion', atraccionRouter);
app.use('/mensaje', mensajeRouter);
app.use('/provincia', provinciaRouter);
app.use('/turista', turistaRouter);

//7- Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`);
});

//8- Pasamos a configurar el router

