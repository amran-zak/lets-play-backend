const Participation = require('../../models/participation');

// Middleware pour vérifier la participation existante
exports.checkDuplicateParticipation = async (req, res, next) => {
  try {
    const userId = req.userId; // L'ID de l'utilisateur doit être extrait du token JWT ou passé dans la requête
    const sportId = req.body.sport; // L'ID du sport doit être fourni dans le corps de la requête

    // Vérifiez si l'utilisateur a déjà une participation en attente ou acceptée pour ce sport
    const participationExists = await Participation.findOne({
      participant: userId,
      sport: sportId,
      etat: { $in: ['pending', 'accepted'] },
    });

    if (participationExists) {
      return res.status(409).json({
        message: "Une participation existe déjà ou est en attente d'approbation."
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};