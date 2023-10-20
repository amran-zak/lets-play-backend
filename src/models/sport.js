const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
    sport: { type: String, required: true },
    numberOfPeopleCurrent: { type: Number, default: 0, required: true },
    numberOfPeopleMax: { type: Number, required: true },
    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    ageMin: { type: Number, required: true },
    ageMax: { type: Number, required: true },
    price: { type: Number, required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

// Ajout de l'index composé
sportSchema.index({ sport: 1, date: 1, startTime: 1, endTime: 1, address: 1, city: 1 }, { unique: true });

const Sport = mongoose.model('Sport', sportSchema);

module.exports = Sport;
