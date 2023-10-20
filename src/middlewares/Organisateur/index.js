const Sport = require('../../models/sport');

exports.checkSportExists = async (req, res, next) => {
    try {
        const { sport, date, startTime, endTime, address, city } = req.body;
        // const existingEvents = await Sport.find({
        //     sport,
        //     date,
        //     address,
        //     city
        // });

        // for (let event of existingEvents) {
        //     console.log(startTime, event.startTime, new Date(startTime).toISOString() <= event.startTime.toISOString())
        //     if (
        //         new Date(startTime).toISOString() <= event.endTime.toISOString() 
        //         && 
        //         new Date(endTime).toISOString() >= event.startTime.toISOString()
        //     ) {
        //         return res.status(400).send('Un événement avec les mêmes détails existe déjà.');
        //     }
        // }
        const existingSport = await Sport.findOne({
            sport: sport,
            date: date,
            startTime: startTime,
            endTime: endTime,
            address: address,
            city: city
        });

        if (existingSport) {
            return res.status(400).send({ message:'Un événement avec les mêmes détails existe déjà.'});
        }
        next(); 
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error');
    }
};

