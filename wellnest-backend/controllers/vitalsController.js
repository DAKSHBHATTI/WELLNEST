const asyncHandler = require('express-async-handler');
const Vital = require('../models/Vital');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const addVitals = asyncHandler(async (req, res) => {
    const { bloodPressure, sugarLevel, heartRate, temperature } = req.body;

    const prompt = `
A patient has recorded the following vitals:
- Blood Pressure: ${bloodPressure}
- Sugar Level: ${sugarLevel} mg/dL
- Heart Rate: ${heartRate} BPM
- Temperature: ${temperature} °F

Based on these vitals, provide a brief analysis of potential health risks and some general wellness suggestions. This is not a substitute for a real medical consultation. Keep the analysis concise and easy to understand.
`;

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const analysisText = response.text();

        const vital = new Vital({
            userId: req.user._id,
            bloodPressure,
            sugarLevel,
            heartRate,
            temperature,
            analysis: analysisText,
        });

        const createdVital = await vital.save();
        res.status(201).json(createdVital);

    } catch (error) {
        console.error('Error during vitals analysis:', error);
        res.status(500);
        throw new Error('Failed to analyze vitals.');
    }
});

const getVitalsHistory = asyncHandler(async (req, res) => {
    const vitals = await Vital.find({ userId: req.user._id }).sort({ timestamp: -1 });
    res.json(vitals);
});

module.exports = { addVitals, getVitalsHistory };
