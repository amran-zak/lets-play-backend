const Sport = require('../../models/sport');
const User = require('../../models/users');

exports.createSport = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const data = {
            ...req.body,
            organizer : userId
        }
        const sport = new Sport(data);
        await sport.save();

        // Mise à jour du rôle de l'organisateur
        const user = await User.findById(userId);
        if (user && !user.roles.includes('organizer')) {
            user.roles.push('organizer');
            await user.save();
        }

        res.status(201).send({ message: 'Création réussie!' });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.updateSport = async (req, res, next) => {
    try {
        const sportId = req.params.sportId;
        const data = {
            ...req.body
        }
        await Sport.findByIdAndUpdate(
            sportId, 
            data, 
            { runValidators: true, /* Exécuter les validateurs du modèle lors de la mise à jour*/ }
        );
        
        return res.status(201).send({ message: 'Modification réussie!' });
    } catch (err) {
        if (err.codeName === 'DuplicateKey') {
            return res.status(409).send({ message: 'Un événement avec les mêmes détails existe déjà.'});
        } else {
            return res.status(500).send({message : err.message});
        }
        
    }
};

exports.viewSports = async (req, res, next) => {
    try {
        const user = req.user;
        const sports = await Sport.find({organizer : user._id});
        return res.status(201).send({ message: 'Recuperation réussie!' , sports : sports});
    } catch (err) {
        return res.status(500).send({message : err.message});
    }
};

exports.viewSportByID = async (req, res, next) => {
    try {
        const id = req.params.sportId;
        const user = req.user;
        const sport = await Sport.findOne({organizer : user._id, _id: id});
        return res.status(201).send({ message: 'Recuperation réussie!' , sport : sport});
    } catch (err) {
        return res.status(500).send({message : err.message});
    }
};