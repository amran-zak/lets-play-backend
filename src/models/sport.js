const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
    sport: { type: String },
    numberOfPeopleCurrent: { type: Number, default: 0 },
    numberOfPeopleMax: { type: Number },
    date: { type: Date },
    startTime: { type: Date },
    endTime: { type: Date },
    address: { type: String },
    city: { type: String },
    ageMin: { type: Number },
    ageMax: { type: Number },
    price: { type: Number },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

// Ajout de l'index composé
sportSchema.index({ sport: 1, date: 1, startTime: 1, endTime: 1, address: 1, city: 1 }, { unique: true });

const Sport = mongoose.model('Sport', sportSchema);

module.exports = Sport;
