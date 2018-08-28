const express = require('express');
const router = express.Router();
const dashbaordControler = require('../controllers/dashboard')

router.get('/dashbaord', dashbaordControler.getDashboard)
module.exports = router