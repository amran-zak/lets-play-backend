const express = require('express');
const router = express.Router();

// middlewares
const middlewares = require("../../middlewares/Rating");
const middlewaresAuthentification = require("../../middlewares/Authentification");

// controllers
const controllers = require("../../controllers/Rating");

// Get all ratings for a specific user (to)
router.get('/to/:userId', controllers.getAllByTo);

// Route pour obtenir la note moyenne
router.get('/average/:userId', controllers.getAverageRating);

// Get all ratings from a specific user (from)
router.get('/from/:userId', controllers.getAllByFrom);

router.get('/to/:toUserId/from/:id',controllers.getByToAndFrom);
router.post('/create-or-update', middlewaresAuthentification.verifyTokenAuth, controllers.createOrUpdate);

// Delete a rating
router.delete('/delete/:id', middlewaresAuthentification.verifyTokenAuth, controllers.delete);

module.exports = router;
