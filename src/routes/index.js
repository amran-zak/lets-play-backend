const express = require('express');
const router = express.Router();

// middlewares


// routes
const authRoutes = require('./Authentification');



router.use('/auth', authRoutes);


module.exports = router;