const express = require('express');
const router = express.Router();
const Rating = require('../../models/rating');

// Get all ratings for a specific user (to)
exports.getAllByTo = async (req, res, next) => {
  try {
    const ratings = await Rating.find({ to: req.params.userId });
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getByToAndFrom = async (req, res, next) => {
  const { toUserId, id } = req.params;

  if (!toUserId || !id) {
    // Retournez une erreur ou une réponse par défaut
    return res.status(400).json({ message: "toUserId et id sont requis" });
  }

  try {
    const rating = await Rating.find({ to: toUserId, from: id });
    console.log(rating)
    if (rating.length === 0) {
      const emptyRating = {
        id: null,
        rating: 0,
        comment: '',
        at: null,
        from: null,
        to: null
      }
      res.json(emptyRating);
      return;
    }
    res.json(rating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get average rating for a specific user (to)
exports.getAverageRating = async (req, res, next) => {
  try {
    const ratings = await Rating.find({ to: req.params.userId });

    if (ratings.length === 0) {
      res.json(0); // Si aucun rating, retourner 0
      return;
    }

    const total = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    const average = total / ratings.length;

    res.json(average);
  } catch (error) {
    console.error("Erreur lors de la récupération des notes:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all ratings from a specific user (from)
exports.getAllByFrom = async (req, res, next) => {
  try {
    const ratings = await Rating.find({ from: req.params.userId });
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a rating
exports.update = async (req, res, next) => {
  try {
    const updatedRating = await Rating.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedRating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new rating
exports.create = async (req, res, next) => {
  const rating = new Rating({
    rating: req.body.rating,
    comment: req.body.comment,
    from: req.body.from,
    to: req.body.to,
  });

  try {
    const newRating = await rating.save();
    res.status(201).json(newRating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create or update a rating
exports.createOrUpdate = async (req, res, next) => {
  try {
    const conditions = { 
      from: req.body.from, 
      to: req.body.to 
    };

    const update = { 
      rating: req.body.rating, 
      comment: req.body.comment 
    };

    const options = { 
      new: true, 
      upsert: true // crée un nouveau document si aucun document ne correspond
    };

    const rating = await Rating.findOneAndUpdate(conditions, update, options);
    res.json(rating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a rating
exports.delete = async (req, res, next) => {
  try {
    await Rating.findByIdAndDelete(req.params.id);
    res.json({ message: 'Rating deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
