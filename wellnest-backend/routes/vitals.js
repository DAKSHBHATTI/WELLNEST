const express = require('express');
const router = express.Router();
const { addVitals, getVitalsHistory } = require('../controllers/vitalsController');
const { protect } = require('../middleware/auth');

router.route('/').post(protect, addVitals).get(protect, getVitalsHistory);

module.exports = router;
