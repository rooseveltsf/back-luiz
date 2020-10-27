const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema(
  {
    teacher_id: {
      type: Number,
      required: true,
    },
    rating: [Number],
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Rating', RatingSchema);