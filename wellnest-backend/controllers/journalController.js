const asyncHandler = require('express-async-handler');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Journal = require('../models/Journal');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const createJournalEntry = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const user = req.user;

    if (!content) {
        res.status(400);
        throw new Error('Journal entry content is required.');
    }

    // AI prompt to determine mood
    const moodPrompt = `Analyze the following journal entry and determine the primary mood from this list: Happy, Content, Neutral, Sad, Anxious. Respond with only the single mood word.\n\nEntry: "${content}"`;
    
    let mood;
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(moodPrompt);
        const response = await result.response;
        mood = response.text().trim();
    } catch (error) {
        console.error('Error getting mood from AI:', error);
        res.status(500);
        throw new Error('Failed to analyze mood.');
    }

    // AI prompt for a supportive response
    const supportivePrompt = `A user is feeling ${mood}. Their journal entry is:\n"${content}"\n\nBased on this, provide a short, supportive, and encouraging response. Offer a gentle reframe or a positive perspective if appropriate, but prioritize validation and empathy. Keep the tone warm and conversational.`;

    let aiResponse;
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(supportivePrompt);
        const response = await result.response;
        aiResponse = response.text();
    } catch (error) {
        console.error('Error communicating with Google AI:', error);
        res.status(500);
        throw new Error('Failed to get an AI response.');
    }

    const journalEntry = await Journal.create({
        userId: user._id,
        mood,
        content,
        AI_response: aiResponse,
    });

    if (journalEntry) {
        res.status(201).json(journalEntry);
    } else {
        res.status(400);
        throw new Error('Invalid journal data.');
    }
});

const getJournalEntries = asyncHandler(async (req, res) => {
    const journalEntries = await Journal.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(journalEntries);
});

module.exports = { createJournalEntry, getJournalEntries };
