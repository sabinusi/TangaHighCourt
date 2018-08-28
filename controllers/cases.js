const Case = require('../models/cases')
const Judges = require('../models/judges')
const RMA = require('../models/record management assistants')
const ResidentMigstry = require('../models/resident migstrate')
exports.getCases = (req, res) => {
    Judges.find({})
        .then(judges => {
            ResidentMigstry.find({})
                .then(rm => {
                    res.render('admin/cases/register', {
                        mainActive: 'cases',
                        subActive: 'cas',
                        title: 'case',
                        judges: judges,
                        rm: rm

                    })
                })
        })


}
exports.postCases = (req, res) => {
    console.log(req.body);
    var judge = {
        id: '',
        firstname: '',
        lastname: ''
    }
    var rm = {
        id: '',
        firstname: '',
        lastname: ''
    }
    var rma = {
        id: '',
        firstname: '',
        lastname: ''
    }
    RMA.findOne({ _id: req.body.rmaid })
        .then(rmas => {
            rma.id = req.body.rmaid
            rma.firstname = rmas.firstname
            rma.lastname = rmas.lastname
            if (req.body.choice == 'judge') {
                Judges.findOne({ _id: req.body.judgeid })
                    .then(judg => {
                        console.log("jude", judg);
                        judge.id = judg._id,
                            judge.firstname = judg.firstname,
                            judge.lastname = judg.lastname
                        var newCase = {
                            name: req.body.name,
                            filenumber: req.body.filenumber,
                            openDate: req.body.opendate,
                            judge: judge,
                            recordManagementAssistance: rma,
                            residentMigstrate: rm
                        }

                        new Case(newCase).save()
                            .then(casess => {
                                req.flash('success', { msg: 'succesfull add a new case' })
                                res.redirect('/case/cases')
                            })
                    })

            } else if (req.body.choice == 'rm') {

                ResidentMigstry.findOne({ _id: req.body.rmid })
                    .then(rmi => {
                        rm.id = req.body.rmid,
                            rm.firstname = rmi.firstname,
                            rm.lastname = rmi.lastname
                        var newCase = {
                            name: req.body.name,
                            filenumber: req.body.filenumber,
                            openDate: req.body.opendate,
                            judge: judge,
                            recordManagementAssistance: rma,
                            residentMigstrate: rm
                        }

                        new Case(newCase).save()
                            .then(casess => {
                                req.flash('success', { msg: 'succesfull add a new case' })
                                res.redirect('/case/cases')
                            })
                    })
            }
        })


}
exports.deleteCase = (req, resp) => {
    Case.remove({ _id: req.params.id })
        .then(room => {
            req.flash('success', { msg: 'succesfull delete a case ' })
            resp.redirect('/case/cases')
        })
}

exports.getAllCases = (req, res) => {
    Case.find({})
        .then(allCases => {
            res.send(allCases)
        })

}
exports.getFilenumber = (req, res) => {
    var allfilenumber = []
    Case.find({}, { filenumber: 1, _id: 0 })
        .then(filenumber => {
            for (let index = 0; index < filenumber.length; index++) {
                allfilenumber.push(filenumber[index].filenumber)

            }
            res.send(allfilenumber)
        })
}