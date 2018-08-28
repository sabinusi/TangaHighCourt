const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const judgeSchema = new mongoose.Schema({

    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    gender: String,
    profile_picture: String


}, { timestamps: true });

const Judge = mongoose.model('Judge', judgeSchema);

module.exports = Judge;
