const express = require('express');
const { generateOutput } = require('../controllers/openaiController');
const router = express.Router();

router.post('/generate-output', generateOutput);

module.exports = router;
