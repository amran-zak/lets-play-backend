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
    [middlewares.isSportCreatedByOrg, middlewares.checkSportExists],
  controllers.updateSport
);
// Recuperation de sports de l'utilisateur connecté
router.get("/sports", controllers.viewSports);
// Recuperation de sport par ID de l'utilisateur connecté
router.get("/sports/:sportId", middlewares.isSportCreatedByOrg,  controllers.viewSportByID);

router.get("/sports/:sportId/participations", middlewares.isSportCreatedByOrg,  controllers.viewParticipationsBySportId);
router.put("/sports/:sportId/participations/:participationId/accept", middlewares.isSportCreatedByOrg,  controllers.acceptParticipation);
router.put("/sports/:sportId/participations/:participationId/reject", middlewares.isSportCreatedByOrg,  controllers.rejectParticipation);

// Suppression d'un sport par ID
router.delete(
  "/sports/:sportId",
  [middlewares.isSportCreatedByOrg],
  controllers.deleteSportByID
);

module.exports = router;
