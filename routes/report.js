const express = require('express');
const router = express.Router();
const reportControler = require('../controllers/report')
const postpondedReportControler = require('../controllers/postponded cases report')

router.get('/reports', reportControler.getClosedCases)
router.get('/postpondedCases', postpondedReportControler.getPostPondedCases)
module.exports = router