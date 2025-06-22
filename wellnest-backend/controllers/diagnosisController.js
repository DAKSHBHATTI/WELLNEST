const asyncHandler = require('express-async-handler');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Diagnosis = require('../models/Diagnosis');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const diagnose = asyncHandler(async (req, res) => {
    try {
        const { symptoms } = req.body; // Simplified to only take symptoms
        const user = req.user;

        if (!symptoms) {
            res.status(400);
            throw new Error('Please provide symptoms');
        }

        const prompt = `
A patient presents with the following symptoms: "${symptoms}"

Based on this information, what is the likely diagnosis and what are the recommended next steps? Provide a brief, clear, and cautious medical opinion. This is not a substitute for a real medical consultation.
`;

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const diagnosisText = response.text();

        // Save the diagnosis to the database
        const newDiagnosis = new Diagnosis({
            userId: user._id,
            symptoms,
            diagnosis: diagnosisText,
        });
        await newDiagnosis.save();

        res.json({ diagnosis: diagnosisText });

    } catch (error) {
        console.error('Error communicating with Google AI:', error);
        res.status(500);
        throw new Error('Failed to get a diagnosis from the AI service.');
    }
});

const getDiagnosisHistory = asyncHandler(async (req, res) => {
    const history = await Diagnosis.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(history);
});

module.exports = { diagnose, getDiagnosisHistory };
