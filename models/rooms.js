const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const rooms = new mongoose.Schema({
    roomname: String,
    roomnumber: String,
    roomdescription: String,

}, { timestamps: true });

const room = mongoose.model('rooms', rooms);

module.exports = room;
