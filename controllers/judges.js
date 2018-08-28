const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const Judge = require('../models/judges');
exports.postJudge = (req, resp) => {
    // resp.send('ok')
    var picture = ''
    if (req.file !== undefined) {
        picture = req.file.filename
    }
    console.log(req.body)
    const newJudge = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        profile_picture: picture
    }
    // req.file.filename = Date.now() + '' + req.file.mimetype.split('/')

    new Judge(newJudge).save()
        .then(judge => {
            req.flash('success', { msg: 'succesfull add judge  ' + judge.firstname + ' ' + judge.lastname + ' informations' })
            Judge.find({})
                .then(judge => {
                    resp.redirect('/judge')
                })
        }
        )
}
exports.putJudge = (req, res) => {
    var picture = ''
    if (req.file !== undefined) {
        picture = req.file.filename
    }
    Judge.findOne({ _id: req.body.id })
        .then(updateJudge => {
            if (picture === '') {
                picture = updateJudge.profile_picture
            }
            updateJudge.firstname = req.body.firstname;
            updateJudge.lastname = req.body.lastname;
            updateJudge.email = req.body.email;
            updateJudge.gender = req.body.gender;
            updateJudge.profile_picture = picture;
            updateJudge.save()
                .then(updatedJudge => {
                    req.flash('success', { msg: 'succesfull updating judge  ' + updatedJudge.firstname + ' ' + updatedJudge.lastname + ' informations' })
                    res.redirect('/judge/edit/' + req.body.id)
                })
        })



}
exports.getJudes = (req, resp) => {
    if (!req.user) {
        return resp.redirect('/login')

    }
    Judge.find({})
        .then(judge => {
            resp.render('admin/judges/judge', {
                judges: judge,
                mainActive: 'rma',
                subActive: 'judge'

            })
        })


}
exports.getAllJudes = (req, resp) => {

    Judge.find({})
        .then(judge => {
            resp.send(judge)
        })
}
exports.deleteJudge = (req, res) => {
    Judge.remove({ _id: req.params.id })
        .then(() => {
            Judge.find({})
                .then(judge => {
                    req.flash('success', { msg: 'succesfull delete ' })
                    res.redirect('/judge')
                })
        })

}
exports.editJudge = (req, res) => {
    Judge.findOne({
        _id: req.params.id
    }).then(judge => {
        res.render('admin/judges/editJudge', {
            judge: judge,
            mainActive: 'rma',
            subActive: 'judge'


        })
    })

}