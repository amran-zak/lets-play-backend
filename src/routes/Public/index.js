const express = require("express");
const router = express.Router();

// middlewares
const middlewares = require("../../middlewares/Public");

// controllers
const controllers = require("../../controllers/Public");

// Renvoie la liste des sports propoposés
router.get("/sports", controllers.getAllSports);


module.exports = router;
