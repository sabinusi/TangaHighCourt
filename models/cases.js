const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const cases = new mongoose.Schema({
    name: { type: String, default: '' },
    filenumber: { type: String, unique: true },
    openDate: { type: String, default: '' },
    closedDate: { type: String, default: '' },
    judge: {
        id: String,
        firstname: String,
        lastname: String,

    },
    recordManagementAssistance: {
        id: String,
        firstname: String,
        lastname: String,

    },
    residentMigstrate: {
        id: String,
        firstname: String,
        lastname: String,

    }
}, { timestamps: true });

const casess = mongoose.model('cases', cases);

module.exports = casess;
