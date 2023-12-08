const express = require('express');
const router = express.Router();

// middlewares
const middlewares = require("../../middlewares/Rating");

// controllers
const controllers = require("../../controllers/Rating");

// Get all ratings for a specific user (to)
router.get('/to/:userId', controllers.getAllByTo);

// Get all ratings from a specific user (from)
router.get('/from/:userId', controllers.getAllByFrom);

// Update a rating
router.patch('/update/:id', middlewares.verifyTokenAndAccount, controllers.update);

// Create a new rating
router.post('/create', middlewares.checkExistingRating, controllers.create);

// Delete a rating
router.delete('/delete/:id', middlewares.verifyTokenAndAccount, controllers.delete);

module.exports = router;
