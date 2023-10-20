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
