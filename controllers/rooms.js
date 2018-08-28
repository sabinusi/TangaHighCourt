const Rooms = require('../models/rooms')
exports.getRooms = (req, res) => {

    Rooms.find({})
        .then(room => {
            res.render('admin/rooms/room', {
                mainActive: 'rooms',
                subActive: 'room',
                title: 'Rooms',
                room: room

            })
        })

}
exports.postRooms = (req, resp) => {
    // resp.send('ok')
    console.log(req.body)
    const newrooms = {
        roomname: req.body.roomname,
        roomnumber: req.body.roomnumber,
        roomdescription: req.body.roomdescription
    }
    new Rooms(newrooms).save()
        .then(rooms => {
            req.flash('success', { msg: 'succesfull add rooms ' })
            resp.redirect('/rooms')
        }
        )
}
exports.deleteRooms = (req, resp) => {
    Rooms.remove({ _id: req.params.id })
        .then(room => {
            req.flash('success', { msg: 'succesfull delete rooms ' })
            resp.redirect('/rooms')
        })
}
exports.editRooms = (req, resp) => {
    Rooms.findOne({
        _id: req.params.id
    }).then(room => {
        resp.render('admin/rooms/editRoom', {
            room: room,
            mainActive: 'rooms',
            subActive: 'rm'


        })
    })
}
exports.putRoom = (req, res) => {

    Rooms.findOne({ _id: req.params.id })
        .then(updateJudge => {

            updateJudge.roomname = req.body.roomname;
            updateJudge.roomnumber = req.body.roomnumber;
            updateJudge.roomdescription = req.body.roomdescription;
            updateJudge.save()
                .then(updatedJudge => {
                    req.flash('success', { msg: 'succesfull edit room informations' })
                    res.redirect('/room/edit/' + req.params.id)
                })
        })



}