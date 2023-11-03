const express = require('express');
const router = express.Router();

// middlewares
const authMiddle = require('../middlewares/Authentification');

// routes
const authRoutes = require('./Authentification');
const organizerRoutes = require('./Organisateur');
const publicRoutes = require('./Public');



router.use('/auth', authRoutes);
router.use('/organizer', authMiddle.verifyTokenAuth, organizerRoutes);
router.use('/public', publicRoutes);


module.exports = router;