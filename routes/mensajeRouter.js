const express = require("express");

const router = express.Router();

const mensajeController = require("../controllers/mensajeController");

router.get("/", mensajeController.getAllMensajes);
router.get("/:id", mensajeController.getMensajeById);
router.get("/provincia/:idProvincia", mensajeController.getMensajesByProvincia)
router.post("/crear", mensajeController.createMensaje);
router.delete("/:id", mensajeController.deleteMensaje);

module.exports = router;