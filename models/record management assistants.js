const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const recordManagementAssistantSchema = new mongoose.Schema({

    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    gender: String,
    profile_picture: String,
    judgeId: String


}, { timestamps: true });

const recordManagementAssistant = mongoose.model('recordManagementAssistant', recordManagementAssistantSchema);

module.exports = recordManagementAssistant;
