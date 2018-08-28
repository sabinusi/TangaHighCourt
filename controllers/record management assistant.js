const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const RecordManagementAssistant = require('../models/record management assistants');
const Judge = require('../models/judges');
const User = require('../models/User')

exports.postrecordManagementAssistant = (req, resp) => {
    console.log("file", req.file);
    var picture = ''
    if (req.file !== undefined) {
        picture = req.file.filename
    }
    const newrecordManagementAssistant = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
        judgeId: req.body.judge,
        profile_picture: picture
    }

    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (err) { return next(err); }
        if (existingUser) {
            req.flash('errors', { msg: 'Record management assistantwith that email address already exists.' });
            return res.redirect('/recordManagementAssistant');
        }
    })
    new RecordManagementAssistant(newrecordManagementAssistant).save()
        .then(recordManagementAssistant => {
            user = new User({
                email: req.body.email,
                password: 'softnet123',
                role: 'rma',
                rmaId: recordManagementAssistant.id,
                profile: {
                    name: req.body.firstname + " " + req.body.lastname

                }
            })
            user.save()
                .then(newUser => {
                    req.flash('success', { msg: 'succesfull add a record management assistant' })
                    resp.redirect('/recordManagementAssistant')
                })

        }
        )

}



exports.getAllRecordManagementAssistant = (req, res) => {
    RecordManagementAssistant.find({}).then(result => {

        res.send(result)
    }

    )
}
exports.putrecordManagementAssistant = (req, res) => {
    var picture = ''
    if (req.file !== undefined) {
        picture = req.file.filename
    }
    RecordManagementAssistant.findOne({ _id: req.body.id })
        .then(recordManagementAssistant => {
            if (picture === '') {
                picture = recordManagementAssistant.profile_picture
            }
            recordManagementAssistant.firstname = req.body.firstname;
            recordManagementAssistant.lastname = req.body.lastname;
            recordManagementAssistant.email = req.body.email;
            recordManagementAssistant.gender = req.body.gender;
            recordManagementAssistant.phone = req.body.phone;
            recordManagementAssistant.judgeId = req.body.judge;
            recordManagementAssistant.profile_picture = picture;
            recordManagementAssistant.save()
                .then(updatedrecordManagementAssistant => {
                    req.flash('success', { msg: 'succesfull update ' + updatedrecordManagementAssistant.firstname + ' ' + updatedrecordManagementAssistant.lastname + ' informations' })
                    res.redirect('/recordManagementAssistant/edit/' + req.body.id)
                })
        })

}
exports.getRecordManagementAssistant = (req, resp) => {
    if (!req.user) {
        return resp.redirect('/login')

    }
    RecordManagementAssistant.find({})
        .then(recordManagementAssistant => {
            Judge.find({}).then(judge => {
                resp.render('admin/record management assistant/rma', {
                    rma: recordManagementAssistant,
                    judges: judge,
                    mainActive: 'rma',
                    subActive: 'rma'

                })
            })
        })


}
exports.deleterecordManagementAssistant = (req, res) => {
    RecordManagementAssistant.remove({ _id: req.params.id })
        .then(() => {
            RecordManagementAssistant.find({})
                .then(recordManagementAssistant => {
                    req.flash('success', { msg: 'succesfull delete a record management assistant ' })
                    res.redirect('/recordManagementAssistant')
                })
        })
}
exports.editrecordManagementAssistant = (req, res) => {
    RecordManagementAssistant.findOne({
        _id: req.params.id
    }).then(recordManagementAssistant => {
        Judge.find({})
            .then(allJudges => {
                res.render('admin/record management assistant/editRma', {
                    rma: recordManagementAssistant,
                    judges: allJudges,
                    selectedJudgeId: req.params.id,
                    mainActive: 'rma',
                    subActive: 'rma'
                })
            })

    })

}