/**
 * Finalmente el archivo db.js será el que cree el objeto que conecta 
 * con la base de datos. 
 * Esa conexión utilizará el objeto mysql provisto en en el módulo mysql2
 */

//1- Importamos el módulo mysql2
const mysql = require("mysql2");

//2- Configuramos conexion a la bd
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
});

// conexion
connection.connect((err) => {
    // En caso de error
    if (err) {
        console.log("Error de conexión con el servidor: " + err);
        return;
    }

    // En caso OK
    console.log("Estado de conexión: CONECTADA");

    // Creamos una consulta
    const sqlCreatedb = 'CREATE DATABASE IF NOT EXISTS turismo_db';

    // Pasamos la consulta a la db
    connection.query(sqlCreatedb, (err, results) => {
        //En caso de error
        if (err) {
            console.log("Error de conexión con el servidor: " + err);
            return;
        }

        //exito
        console.log("Base de datos: CREADA/EXISTENTE/GARANTIZADA");

        // TABLA
        connection.changeUser({ database: "turismo_db" }, (err) => {
            if (err) {
                console.log("Error al cambiar a la base de datos turismo_db: " + err);
                return;
            }

            // Generamos la consulta para crear la tabla
            const createTableQuery1 = `
                CREATE TABLE IF NOT EXISTS atraccion (
                    id_atraccion INT AUTO_INCREMENT PRIMARY KEY,
                    lugar VARCHAR(255) NOT NULL,
                    precio INT(10) NOT NULL,
                    dias INT(10) NOT NULL
                );
            `;

            // Pasamos la consulta
            connection.query(createTableQuery1, (err, results) => {
                //En caso de error
                if (err) {
                    console.error('Error al crear la tabla de turismo:', err);
                    return;
                }

                //Éxito
                console.log("Tablas: CREADAS/EXISTENTES/GARANTIZADAS");
            })

            const createTableQuery2 = `
                CREATE TABLE IF NOT EXISTS provincia (
                    id_provincia INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(50) NOT NULL            
                );
            `;

            // Pasamos la consulta
            connection.query(createTableQuery2, (err, results) => {
                //En caso de error
                if (err) {
                    console.error('Error al crear la tabla de provincias:', err);
                    return;
                }

                //Éxito
                console.log("Tablas: CREADAS/EXISTENTES/GARANTIZADAS");
            })

            const createTableQuery3 = `
                CREATE TABLE IF NOT EXISTS mensaje (
                    id_mensaje INT AUTO_INCREMENT PRIMARY KEY,
                    nombre_persona VARCHAR(50) NOT NULL,
                    apellido_persona VARCHAR(50) NOT NULL,
                    ciudad VARCHAR(50) NOT NULL,
                    codigo_postal INT NOT NULL,
                    email VARCHAR(254) NOT NULL,
                    id_provincia INT,
                    FOREIGN KEY (id_provincia) REFERENCES provincia(id_provincia),
                    telefono INT NOT NULL,
                    mensaje TEXT NOT NULL
                );
            `;

            // Pasamos la consulta
            connection.query(createTableQuery3, (err, results) => {
                //En caso de error
                if (err) {
                    console.error('Error al crear la tabla de mensajes:', err);
                    return;
                }

                //Éxito
                console.log("Tablas: CREADAS/EXISTENTES/GARANTIZADAS");
            })

            const createTableQuery4 = `
                CREATE TABLE IF NOT EXISTS turista (
                    id_turista INT AUTO_INCREMENT PRIMARY KEY,
                    nombre VARCHAR(50) NOT NULL,
                    apellido VARCHAR(50) NOT NULL,
                    nombre_usuario VARCHAR(50) NOT NULL,
                    email VARCHAR(254) NOT NULL,
                    contrasenia VARCHAR(16) NOT NULL
                );
            `;

            // Pasamos la consulta
            connection.query(createTableQuery4, (err, results) => {
                //En caso de error
                if (err) {
                    console.error('Error al crear la tabla de turistas:', err);
                    return;
                }

                //Éxito
                console.log("Tablas: CREADAS/EXISTENTES/GARANTIZADAS");
            })

            const createTableQuery5 = `
                CREATE TABLE IF NOT EXISTS atraccion_turista (
                    id_atraccion_turista INT AUTO_INCREMENT PRIMARY KEY,
                    id_atraccion INT,
                    FOREIGN KEY (id_atraccion) REFERENCES atraccion(id_atraccion),
                    id_turista INT,
                    FOREIGN KEY (id_turista) REFERENCES turista(id_turista)
                );
            `;

            // Pasamos la consulta
            connection.query(createTableQuery5, (err, results) => {
                //En caso de error
                if (err) {
                    console.error('Error al crear la tabla de atraccion_turista:', err);
                    return;
                }

                //Éxito
                console.log("Tablas: CREADAS/EXISTENTES/GARANTIZADAS");
            })
        })
    })
})

// Exportacion del módulo
module.exports = connection;
