const jwt = require('jsonwebtoken');
require('dotenv').config();
const Rating = require('../../models/rating');

// Middleware pour vérifier si le token est associé à un compte existant
exports.verifyTokenAndAccount = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY_AUTH);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      throw new Error('Aucun utilisateur trouvé avec ce token.');
    }

    // Vérifiez si le compte associé au token correspond au champ 'from' dans la requête
    if (user._id.toString() !== req.body.from) {
      return res.status(401).json({ message: 'Le compte associé au token ne correspond pas à l\'expéditeur.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Le token d\'authentification est invalide.' });
  }
};

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
