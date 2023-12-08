const express = require('express');
const router = express.Router();
const Rating = require('../models/Rating'); // Assuming your model is in a 'models' directory

// Get all ratings for a specific user (to)
exports.getAllByTo = async (req, res, next) => {
  try {
    const ratings = await Rating.find({ to: req.params.userId });
    res.json(ratings);
  } catch (error) {
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

// Delete a rating
exports.delete = async (req, res, next) => {
  try {
    await Rating.findByIdAndDelete(req.params.id);
    res.json({ message: 'Rating deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
