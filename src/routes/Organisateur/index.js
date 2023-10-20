const express = require("express");
const router = express.Router();

// middlewares
const middlewares = require("../../middlewares/Organisateur");

// controllers
const controllers = require("../../controllers/Organisateur");

//*********************************** Sport******************************* */
// Création d'un sport
router.post("/sports", middlewares.checkSportExists, controllers.createSport);
// Modification d'un sport
router.put(
  "/sports/:sportId",
  middlewares.isSportCreatedByOrg,
  controllers.updateSport
);

module.exports = router;
