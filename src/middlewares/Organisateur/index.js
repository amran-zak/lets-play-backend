const Sport = require('../../models/sport');

exports.checkSportExists = async (req, res, next) => {
    try {
        const { sport, numberOfPeopleMax, numberOfPeopleCurrent, date, startTime, endTime, address, city, ageMin, ageMax, price } = req.body;
        const existingSport = await Sport.findOne({
            sport: sport,
            numberOfPeopleMax: numberOfPeopleMax,
            numberOfPeopleCurrent: numberOfPeopleCurrent,
            date: new Date(date),
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            address: address,
            city: city,
            ageMin: ageMin,
            ageMax: ageMax,
            price: price
        });
        if (existingSport) {
            return res.status(400).send({ message:'Un événement avec les mêmes détails existe déjà.'});
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};

exports.isSportCreatedByOrg = async (req, res, next) => {
    try {
        const sportId = req.params.sportId;
        const user = req.user;
        const sport = await Sport.findById(sportId);
        if(!sport) return res.status(404).send({ message: 'L\'événement n\'existe pas'})
        if (!sport.organizer.equals(user._id)) {
            return res.status(400).send({ message:'Cet événement n\'a pas été crée par l\'organisateur connecté.'});
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};

exports.isSportCreatedByOrg = async (req, res, next) => {
    try {
        const sportId = req.params.sportId;
        const user = req.user;
        const sport = await Sport.findById(sportId);
        if(!sport) return res.status(404).send({ message: 'L\'événement n\'existe pas'})
        if (!sport.organizer.equals(user._id)) {
            return res.status(400).send({ message:'Cet événement n\'a pas été crée par l\'organisateur connecté.'});
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};