const Sport = require('../../models/sport');


exports.getAllSports = async (req, res, next) => {
    try {
        // Populate only the userName of organizer.
        const sports = await Sport.find().populate({
            path: 'organizer',
            select: 'userName phoneNumber _id'
        });

        // Now map over the sports to create a new array with modified phoneNumbers
        const modifiedSports = sports.map(sport => {
            const sportObj = sport.toObject(); // Convert document to a plain JavaScript object
            // Check if phoneNumber exists and has enough length before slicing
            if(sportObj.organizer && sportObj.organizer.phoneNumber && sportObj.organizer.phoneNumber.toString().length >= 2) {
                sportObj.organizer.phoneNumber = sportObj.organizer.phoneNumber.toString().slice(0, 2);
            }

            return sportObj;
        });

        res.status(200).send({ message: 'Recuperation réussie!', sports: modifiedSports });
    } catch (error) {
        next(error);
    }
};

exports.getSportById = async (req, res, next) => {
    try {
        const sportId = req.params.id;

        // Utilisez la méthode populate pour récupérer également l'organisateur
        const sport = await Sport.findById(sportId).populate({
            path: 'organizer',
            select: 'userName phoneNumber _id'
        });

        if (!sport) {
            return res.status(404).json({ message: 'Sport non trouvé.' });
        }

        return res.status(200).json({ message: 'Récupération réussie!', sport: sport });
    } catch (error) {
        next(error);
    }
};