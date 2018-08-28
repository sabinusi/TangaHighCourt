const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const cases = new mongoose.Schema({
    caseId: String,
    date: String,
    status: String,
    roomId: String,
    startTime: String,
    endTime: String
}, { timestamps: true });

const casess = mongoose.model('casehearing', cases);

module.exports = casess;
