const mongoose = require('mongoose');
const { Schema } = mongoose;

const ratingShema  = new Schema({
    id: { type: String },
    rating: { type: Number },
    comment: { type: String},
    at: { type: Date },
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

ratingShema.index({ from: 1, to: 1 }, { unique: true });

const Rating = mongoose.model('Rating', ratingShema);
module.exports = Rating;
