const express = require('express');
const router = express.Router();

// controllers
const controllers = require('../../controllers/Authentification')

// Inscription
router.post('/sign-up', controllers.signUp);

// Connexion
router.post('/sign-in', controllers.signIn);


module.exports = router;
