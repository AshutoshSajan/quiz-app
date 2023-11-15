const mongoose = require('mongoose');

const { Schema } = mongoose;

const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      max: 100,
      min: 5,
    },
    description: {
      type: String,
      default: '',
      required: true,
      max: 1000,
      min: 200,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Post', quizSchema);
