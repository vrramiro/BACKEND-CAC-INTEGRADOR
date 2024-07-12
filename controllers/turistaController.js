const db = require("../db/db");

const getAllTuristas = (req, res) => {
    const sql = "SELECT * FROM turista";

    db.query(sql, [], (err, result) => {
        if (err) {
            throw err;
        }

        return res.status(200).json(result);
    });
};

const getTuristaById = (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM turista WHERE id_turista = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            throw err;
        }

        return res.status(200).json(result);
    });
};

const getAtraccionesByTurista = (req, res) => {
    const { idTurista } = req.params;

    const sql = `
        SELECT a.*
        FROM atraccion a
        INNER JOIN atraccion_turista at ON at.id_atraccion = a.id_atraccion
        WHERE at.id_turista = ?
    `;

    db.query(sql, [idTurista], (err, result) => {
        if (err) {
            throw err;
        }

        return res.status(200).json(result);
    });
};

const createTurista = (req, res) => {
    const { nombre, apellido, nombreUsuario, email, contrasenia } = req.body;

    const sql = "INSERT INTO turista (nombre, apellido, nombre_usuario, email, contrasenia) VALUES (?,?,?,?,?)";

    db.query(sql, [nombre, apellido, nombreUsuario, email, contrasenia], (err, result) => {
        if (err) {
            throw err;
        }

        return res.status(200).json({ message: "Turista creado con exito" });
    });
};

const addAtraccionToTurista = (req, res) => {
    const { idTurista } = req.params;

    const { idAtraccion } = req.body;

    const sql = "INSERT INTO atraccion_turista (id_atraccion, id_turista) VALUES (?, ?)";

    db.query(sql, [idAtraccion, idTurista], (err, result) => {
        if (err) {
            throw err;
        }

        return res.status(200).json({ message: "Se añadio el viaje con exito" });
    });
};

const updateTurista = (req, res) => {
    const { id } = req.params;

    const { nombre, apellido, nombreUsuario, email, contrasenia } = req.body;

    const sql = "UPDATE turista SET nombre = ?, apellido = ?, nombre_usuario = ?, email = ?, contrasenia = ? WHERE id_turista = ?";

    db.query(sql, [nombre, apellido, nombreUsuario, email, contrasenia, id], (err, result) => {
        if (err) {
            throw err;
        }

        return res.status(200).json({ message: "Turista actualizado con exito" });
    });
};

const deleteTurista = (req, res) => {
    const { id } = req.params;

    const sql1 = "DELETE FROM atraccion_turista WHERE id_turista = ?"
    const sql2 = "DELETE FROM turista WHERE id_turista = ?";

    db.query(sql1, [id], (err, result) => {
        if (err) {
            throw err;
        }

        db.query(sql2, [id], (err, result) => {
            if (err) {
                throw err;
            }

            return res.status(200).json({ message: "Turista eliminado con exito" });
        });
    });
};

module.exports = {
    getAllTuristas,
    getTuristaById,
    getAtraccionesByTurista,
    addAtraccionToTurista,
    updateTurista,
    createTurista,
    deleteTurista
}