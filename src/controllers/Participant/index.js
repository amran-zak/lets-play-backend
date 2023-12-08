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