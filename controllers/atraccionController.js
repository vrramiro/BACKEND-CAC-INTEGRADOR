/**
 * El controlador es el que tendrá los cambios más importantes 
 * y es el que hará el tratamiento de la información.
 * En este archivo tenemos que codificar los métodos
 * .getAllturismo
 * .getturismoById
 * .createturismo
 * .updateturismo
 * .deleteturismo
 */

//1- Importamos el módulo db.js
// El objeto db posee los métodos para conectar con la base de datos. 
// Es la conexión a la base de datos.

const db = require("../db/db.js");

//2- .getAllturismo
const getAllAtracciones = (req, res) => {
    // creamos una consulta
    const sql = 'SELECT * FROM atraccion';

    //Eviamos la consulta a la bbdd
    db.query(sql, (err, result) => {
        //si sucede algun error
        if (err) { throw err }
        //si todo sale bien
        res.json(result);
    });
};

//3- .getturismoById
const getAtraccionById = (req, res) => {
    //1- Obtenemos la info de id que viene desde el cliente
    // const id = req.params.id;
    // Esta es una notacion de desestructuración {id}
    const { id } = req.params;

    // creamos la consulta
    // Creamos la consulta con marcador de posición ?
    const sql = 'SELECT * FROM atraccion WHERE id_atraccion = ?';

    // Enviamos la consulta a la bbdd
    db.query(sql, [id], (err, result) => {
        //si sucede algun error
        if (err) { throw err }
        //si todo sale bien
        res.status(200).json(result);
    });
};

//4- createturismo
const createAtraccion = (req, res) => {
    // desestructuramos la req
    const { lugar, precio, dias } = req.body;

    // creamos la consulta
    const sql = 'INSERT INTO atraccion (lugar, precio, dias) VALUES (?, ?, ?)';

    //Enviamos la consulta a la bbdd
    db.query(sql, [lugar, precio, dias], (err, result) => {
        //si sucede algun error
        if (err) { throw err }
        //si todo sale bien
        res.status(200).json({ mensaje: "Atraccion creada con exito" });
    });
};

//5- updateturismo
const updateAtraccion = (req, res) => {
    // desestructuracion de la consulta
    const { id } = req.params;
    const { lugar, precio, dias } = req.body;

    // creamos la consulta sql
    const sql = 'UPDATE atraccion SET lugar = ?, precio = ?, dias = ? WHERE id_atraccion = ?';

    // enviamos consulta a la bbdd
    db.query(sql, [lugar, precio, dias, id], (err, result) => {
        //si sucede algun error
        if (err) { throw err }
        //si todo sale bien
        res.status(200).json({ mensaje: "Atraccion actualizada con exito" });
    });
};

//6- Delete
const deleteAtraccion = (req, res) => {
    // desestructuracion
    const { id } = req.params;

    // consulta sql
    const sql = 'DELETE FROM atraccion WHERE id_atraccion = ?';

    // Pasamos la consulta
    db.query(sql, [id], (err, result) => {
        //si sucede algun error
        if (err) { throw err }
        //si todo sale bien
        res.status(200).json({ mensaje: "Atraccion eliminada con exito" });
    });
};

//7- Exportamos los módulos
module.exports = {
    getAllAtracciones,
    getAtraccionById,
    createAtraccion,
    updateAtraccion,
    deleteAtraccion
}

// 8- Pasamos a codificar db.js