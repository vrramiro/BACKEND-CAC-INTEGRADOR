const db = require("../db/db.js");

const getAllMensajes = (req, res) => {
    const sql = "SELECT * FROM mensaje";

    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }

        return res.status(200).json(result);
    });
};

const getMensajeById = (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM mensaje WHERE id_mensaje = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            throw err;
        }

        return res.status(200).json(result[0]);
    });
};

const getMensajesByProvincia = (req, res) => {
    const { idProvincia } = req.params;

    const sql = `
        SELECT m.id_mensaje, 
               m.nombre_persona,
               m.apellido_persona,
               m.ciudad,
               m.codigo_postal,
               m.email,
               m.telefono,
               m.mensaje,
               p.nombre AS nombre_provincia
        FROM mensaje m
        INNER JOIN provincia p ON m.id_provincia = p.id_provincia
        WHERE m.id_provincia = ?
    `;

    db.query(sql, [idProvincia], (err, result) => {
        if (err) {
            throw err;
        }

        return res.status(200).json(result);
    })
};

const createMensaje = (req, res) => {
    const { nombrePersona, apellidoPersona, ciudad, codigoPostal, email, idProvincia, telefono, mensaje } = req.body;

    const sql = "INSERT INTO mensaje (nombre_persona, apellido_persona, ciudad, codigo_postal, email, id_provincia, telefono, mensaje) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, [nombrePersona, apellidoPersona, ciudad, codigoPostal, email, idProvincia, telefono, mensaje], (err, result) => {
        if (err) {
            throw err;
        }

        return res.status(201).json({
            message: "Se añadio el mensaje de forma exitosa"
        });
    });
};

//No debe haber update dado que es algo que genera un usuario y que nadie deberia poder editar

const deleteMensaje = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM mensaje WHERE id_mensaje = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            throw err;
        }

        return res.status(200).json({ message: "Mensaje eliminado correctamente" });
    });
};

module.exports = {
    getAllMensajes,
    getMensajeById,
    getMensajesByProvincia,
    createMensaje,
    deleteMensaje
};