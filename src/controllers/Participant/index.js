const Participation = require("../../models/participation");
const Sport = require("../../models/sport");

exports.createParticipation = async (req, res, next) => {
  const userId = req.user._id;
  const sportId = req.params.sportId;
  try {
    const newParticipation = new Participation({
      participant: userId,
      sport: sportId
    });
    const savedParticipation = await newParticipation.save();
    let sport = await Sport.findById(sportId);
    sport.numberOfPeopleCurrent++;
    await sport.save();
    res.status(201).send(savedParticipation);
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Erreur lors de la création de la participation",
        error: error.message,
      });
  }
};

exports.getMyAllParticipation = async (req, res) => {
  const userId = req.user._id;
  try {
    const participations = await Participation.find({participant:userId}).populate('sport').populate([{ path: 'sport', populate: {path : 'organizer'}}]);
    res.status(201).send(participations);
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Erreur lors de la création de la participation",
        error: error.message,
      });
  }
};

exports.deleteParticipation = async (req, res, next) => {
  const participationId = req.params.participationId;
  try {
    const participation = await Participation.findById(participationId);
    let sport = await Sport.findById(participation.sport);
    sport.numberOfPeopleCurrent--;
    await sport.save();
    await Participation.findByIdAndDelete(participationId)
    res.status(201).send({
      message: 'suppression succée!'
    });
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Erreur lors de la suppression de la participation",
        error: error.message,
      });
  }
};

exports.isParticipatingInSport = async (req, res) => {
  try {
    const sportId = req.params.sportId;
    const userId = req.user._id;

    // Vérifier si l'utilisateur participe au sport
    const participation = await Participation.findOne({ participant: userId, sport: sportId }).populate('sport');
    
    // Si la participation n'est pas trouvée, l'utilisateur ne participe pas
    if (!participation) {
      return res.status(200).send({ isParticipating: false });
    }

    // Si la participation est trouvée, l'utilisateur participe
    return res.status(200).send({ isParticipating: true, sport: participation.sport });
  } catch (err) {
    return res.status(500).send({ message: "Erreur serveur", error: err.message });
  }
};