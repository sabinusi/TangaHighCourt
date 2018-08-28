const express = require('express');
const router = express.Router();
const casesHearingControler = require('../controllers/case hearing')

router.get('/case/hearing', casesHearingControler.getCaseHearing)

module.exports = router