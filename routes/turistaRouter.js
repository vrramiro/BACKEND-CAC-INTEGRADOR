const express = require("express");

const router = express.Router();

const turistaController = require("../controllers/turistaController");

router.get("/", turistaController.getAllTuristas);
router.get("/:id", turistaController.getTuristaById);
router.get("/atracciones-visitadas/:idTurista", turistaController.getAtraccionesByTurista);
router.post("/crear", turistaController.createTurista);
router.post("/aniadir-atraccion-visitada/:idTurista", turistaController.addAtraccionToTurista);
router.put("/:id", turistaController.updateTurista);
router.delete("/:id", turistaController.deleteTurista);

module.exports = router;