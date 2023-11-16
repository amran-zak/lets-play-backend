const express = require('express');
const router = express.Router();

// middlewares
const authMiddle = require('../middlewares/Authentification');

// routes
const authRoutes = require('./Authentification');
const organizerRoutes = require('./Organisateur');
const publicRoutes = require('./Public');
const participationRoutes = require('./Participant');



router.use('/auth', authRoutes);
router.use('/organizer', authMiddle.verifyTokenAuth, organizerRoutes);
router.use('/public', publicRoutes);
router.use('/participations', authMiddle.verifyTokenAuth, participationRoutes);


module.exports = router;