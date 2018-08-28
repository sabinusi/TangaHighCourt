const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const residentMigstrat = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    gender: String,
    profile_picture: String,
}, { timestamps: true });

const residentMigstrate = mongoose.model('ResidentMigstrate', residentMigstrat);

module.exports = residentMigstrate;
