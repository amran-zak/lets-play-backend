const jwt = require('jsonwebtoken');
require('dotenv').config();
const Rating = require('../../models/rating');

// Middleware pour vérifier si une évaluation existe déjà entre les mêmes utilisateurs
exports.checkExistingRating = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    // Vérifiez si une évaluation existe déjà entre les mêmes utilisateurs
    const existingRating = await Rating.findOne({ from, to });

    if (existingRating) {
      return res.status(400).json({ message: 'Une évaluation entre ces utilisateurs existe déjà.' });
    }

    // Si aucune évaluation n'existe déjà, passez à l'étape suivante
    next();
  } catch (error) {
    next(error);
  }
};
