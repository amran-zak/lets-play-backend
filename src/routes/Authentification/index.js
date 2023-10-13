const express = require('express');
const router = express.Router();

// controllers
const controllers = require('../../controllers/Authentification')

// Inscription
router.post('/sign-up', controllers.signUp);



module.exports = router;
