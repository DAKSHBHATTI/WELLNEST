const mongoose = require('mongoose');

const vitalSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    bloodPressure: {
        type: String,
        required: true,
    },
    sugarLevel: {
        type: String,
        required: true,
    },
    heartRate: {
        type: Number,
        required: true,
    },
    temperature: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    analysis: {
        type: String,
    },
});

const Vital = mongoose.model('Vital', vitalSchema);

module.exports = Vital;
