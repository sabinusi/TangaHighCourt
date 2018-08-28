const express = require('express');
const router = express.Router();
const roomsControler = require('../controllers/rooms')

router.get('/rooms', roomsControler.getRooms)
router.post('/rooms/post', roomsControler.postRooms)
router.post('/room/delete/:id', roomsControler.deleteRooms)
router.get('/room/edit/:id', roomsControler.editRooms)
router.post('/room/put/:id', roomsControler.putRoom)
module.exports = router