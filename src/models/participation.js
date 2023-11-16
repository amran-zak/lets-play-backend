const mongoose = require('mongoose');
const { Schema } = mongoose;

const participationSchema = new Schema(
  {
    participant: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true
    },
    sport: {
      type: Schema.Types.ObjectId,
      ref: 'Sport', 
      required: true
    },
    etat: {
      type: String,
      enum: ['pending', 'accepted', 'refused', 'expired'],
      default: 'pending'
    },
    dateParticipation: {
      type: Date,
      default: Date.now
    },
    updated: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true } // Cette option Mongoose ajoute `createdAt` et `updatedAt` fields
);

// Si vous avez besoin d'un champ pour une date d'expiration, vous pouvez l'ajouter :
participationSchema.index({ "updatedAt": 1 }, { expireAfterSeconds: 3600 }); // Expire après une heure

const Participation = mongoose.model('Participation', participationSchema);

module.exports = Participation;
