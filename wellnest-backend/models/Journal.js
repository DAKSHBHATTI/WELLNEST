const mongoose = require('mongoose');

const journalSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    mood: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    AI_response: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;