const express = require('express');
const router = express.Router();
const { diagnose, getDiagnosisHistory } = require('../controllers/diagnosisController');
const { protect } = require('../middleware/auth');

router.route('/').post(protect, diagnose).get(protect, getDiagnosisHistory);

module.exports = router;
