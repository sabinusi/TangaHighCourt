const express = require('express');
const router = express.Router();
const casesControler = require('../controllers/cases')

router.get('/case/cases', casesControler.getCases)
router.post('/case/post', casesControler.postCases)
router.get('/case/allCases', casesControler.getAllCases)
router.post('/case/delete/:id', casesControler.deleteCase)
router.get('/case/filenunmber', casesControler.getFilenumber)
module.exports = router