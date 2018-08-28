const Room = require('../models/rooms')
const Judges = require('../models/judges')

const ResidentMigstry = require('../models/resident migstrate')

exports.getCaseHearing = (req, res) => {
    Room.find({})
        .then(room => {
            Judges.find({})
                .then(judge => {
                    ResidentMigstry.find(rmi => {

                        res.render('admin/cases/hearing', {
                            title: 'caseHearing',
                            mainActive: 'cases',
                            subActive: 'hearing',
                            title: 'case hearing',
                            room: room,
                            judges: judge,
                            rm: rmi
                        })
                    })

                })

        })

};
exports.postCaseHearing = (req, res) => {

}