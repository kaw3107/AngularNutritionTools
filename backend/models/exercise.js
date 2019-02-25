const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
    exerciseName: { type: String, required: true },
    duration: { type: String, required: true },
    calories: { type: String, required: true },
    dateAdded: { type: String, required: true },
});

module.exports = mongoose.model('Exercise', exerciseSchema);