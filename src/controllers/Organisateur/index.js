const Sport = require("../../models/sport");
const User = require("../../models/users");
const Participation = require("../../models/participation");

exports.createSport = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const data = {
      ...req.body,
      organizer: userId,
    };
    const sport = new Sport(data);
    await sport.save();

    // Mise à jour du rôle de l'organisateur
    const user = await User.findById(userId);
    if (user && !user.roles.includes("organizer")) {
      user.roles.push("organizer");
      await user.save();
    }

    res.status(201).send({ message: "Création réussie!" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateSport = async (req, res, next) => {
  try {
    const sportId = req.params.sportId;
    const data = {
      ...req.body,
    };
    await Sport.findByIdAndUpdate(sportId, data, {
      runValidators: true /* Exécuter les validateurs du modèle lors de la mise à jour*/,
    });

    return res.status(201).send({ message: "Modification réussie!" });
  } catch (err) {
    if (err.codeName === "DuplicateKey") {
      return res
        .status(409)
        .send({ message: "Un événement avec les mêmes détails existe déjà." });
    } else {
      return res.status(500).send({ message: err.message });
    }
  }
};

exports.viewSports = async (req, res, next) => {
  try {
    const user = req.user;
    const sports = await Sport.find({ organizer: user._id });
    return res
      .status(201)
      .send({ message: "Recuperation réussie!", sports: sports });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.viewSportByID = async (req, res, next) => {
  try {
    const id = req.params.sportId;
    const user = req.user;
    const sport = await Sport.findOne({ organizer: user._id, _id: id });
    return res
      .status(201)
      .send({ message: "Recuperation réussie!", sport: sport });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.viewParticipationsBySportId = async (req, res, next) => {
  try {
    const sportId = req.params.sportId;
    const participations = await Participation.find({
      sport: sportId,
    }).populate("participant");
    return res.status(201).send(participations);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.deleteSportByID = async (req, res, next) => {
  try {
    const sportId = req.params.sportId;
    const userId = req.user._id;

    // Vérifier si l'utilisateur est l'organisateur du sport
    const sport = await Sport.findOne({ _id: sportId, organizer: userId });

    if (!sport) {
      return res.status(404).send({ message: "Sport non trouvé." });
    }

    // Supprimer le sport
    await Sport.findByIdAndDelete(sportId);

    await Participation.deleteOne({sport: sportId});

    // Mettre à jour le rôle de l'organisateur s'il n'a plus d'événements organisés
    const user = await User.findById(userId);
    const userSports = await Sport.find({ organizer: userId });

    if (user && userSports.length === 0 && user.roles.includes("organizer")) {
      // Retirer le rôle d'organisateur
      user.roles = user.roles.filter((role) => role !== "organizer");
      await user.save();
    }

    return res.status(200).send({ message: "Suppression réussie!" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.acceptParticipation = async (req, res, next) => {
  try {
    const participationId = req.params.participationId;
    const participations = await Participation.findByIdAndUpdate(
      participationId,
      { etat: "accepted" },
      {
        runValidators: true /* Exécuter les validateurs du modèle lors de la mise à jour*/,
      }
    );
    return res.status(201).send(participations);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
exports.rejectParticipation = async (req, res, next) => {
    try {
      const participationId = req.params.participationId;
      const participations = await Participation.findByIdAndUpdate(
        participationId,
        { etat: "refused" },
        {
          runValidators: true /* Exécuter les validateurs du modèle lors de la mise à jour*/,
        }
      );
      return res.status(201).send(participations);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  };