const express = require("express");
const router = express.Router();

// middlewares
const middlewares = require("../../middlewares/Participant");

// controllers
const controllers = require("../../controllers/Participant");

// Renvoie la liste des sports propoposés
router.post("/:sportId", middlewares.checkDuplicateParticipation, controllers.createParticipation);

router.get("/", controllers.getMyAllParticipation);

router.delete("/:participationId", controllers.deleteParticipation);


module.exports = router;
