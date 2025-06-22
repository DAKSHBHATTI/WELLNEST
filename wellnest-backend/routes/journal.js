const express = require('express');
const router = express.Router();
const { createJournalEntry, getJournalEntries } = require('../controllers/journalController');
const { protect } = require('../middleware/auth');

router.route('/').post(protect, createJournalEntry).get(protect, getJournalEntries);

module.exports = router;
