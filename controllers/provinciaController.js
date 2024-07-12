const db = require("../db/db");

const getAllProvincias = (req, res) => {
    const sql = "SELECT * FROM provincia";

    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }

        return res.status(200).json(result);
    })
}

const getProvinciaById = (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM provincia WHERE id_provincia = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            throw err;
        }

        return res.status(200).json(result);
    });
};

const createProvincia = (req, res) => {
    const { nombre } = req.body;

    const sql = "INSERT INTO provincia (nombre) VALUES (?)";

    db.query(sql, [nombre], (err, result) => {
        if (err) {
            throw err;
        }

        return res.status(200).json({ message: "Provincia creada exitosamente" });
    });
};

const updateProvincia = (req, res) => {
    const { id } = req.params;

    const { nombre } = req.body;

    const sql = "UPDATE provincia SET nombre = ? WHERE id_provincia = ?";

    db.query(sql, [nombre, id], (err, result) => {
        if (err) {
            throw err;
        }

        return res.status(200).json({ message: "Provincia actualizada exitosamente" });
    });
};

const deleteProvincia = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM provincia WHERE id_provincia = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            throw err;
        }

        return res.status(200).json({ message: "Provincia eliminada exitosamente" });
    });
};

module.exports = {
    getAllProvincias,
    getProvinciaById,
    createProvincia,
    updateProvincia,
    deleteProvincia
}