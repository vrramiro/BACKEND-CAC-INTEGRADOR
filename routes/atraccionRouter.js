// src/routes/turismoRoutes.js
/**
 * Enrutador 
 * Endpoints
 */

// 1- Importamos el módulo
const express = require("express");

// 2- Instanciamos Router de express
const router = express.Router();

// 3- Importamos el módulo propio atraccionController (a realizarlo a futuro)
const atraccionController = require('../controllers/atraccionController');

// 4- En atraccionController programaremos el módulo junto a métodos GET, POST, PUT, DELETE
// Dejaremos sólo la declaración de las rutas, con sus métodos 
// y el llamado al atraccionController con el método específico para cada opción 

// Ruta de listado en general
router.get('/', atraccionController.getAllAtracciones);
//Ruta para la consulta de peliculas por id
router.get('/:id', atraccionController.getAtraccionById);
//Ruta para crear una pelicula
router.post('/crear', atraccionController.createAtraccion);
//Ruta para actualizar una pelicula
router.put('/:id', atraccionController.updateAtraccion);
//Ruta para borrar una pelicula
router.delete('/:id', atraccionController.deleteAtraccion);

//5- Exportamos el módulo
module.exports = router;

//6- Pasamos a configurar atraccionController.js

