const express = require('express');
const router = express.Router();

// middlewares
const middlewares = require("../../middlewares/Authentification")

// controllers
const controllers = require('../../controllers/Authentification')

// Inscription
router.post('/sign-up',middlewares.checkExistingUser, controllers.signUp);

// Connexion
router.post('/sign-in', controllers.signIn);

// Forgot Password
router.post('/forgot-password', controllers.forgotPassword);


module.exports = router;
