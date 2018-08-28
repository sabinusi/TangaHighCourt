const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
// const recordManagementAssistant = require('../models/record management assistants');
const ResidentMigstrate = require('../models/resident migstrate');

exports.postResidentMigstrate = (req, resp) => {
    var picture = ''
    if (req.file !== undefined) {
        picture = req.file.filename
    }

    const newResidentMigstrate = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
        profile_picture: picture
    }
    new ResidentMigstrate(newResidentMigstrate).save()
        .then(ResidentMigstrate => {
            req.flash('success', { msg: 'succesfull add a resident migistrate' })
            resp.redirect('/residentMigstrate')
        }
        )

}
exports.getAllResidentMigstrate = (req, res) => {
    ResidentMigstrate.find({}).then(result => {
        res.send(result)
    }

    )
}
exports.putResidentMigstrate = (req, res) => {
    var picture = ''
    if (req.file !== undefined) {
        picture = req.file.filename
    }

    ResidentMigstrate.findOne({ _id: req.body.id })
        .then(residentMigstrate => {
            if (picture === '') {
                picture = residentMigstrate.profile_picture
            }
            residentMigstrate.firstname = req.body.firstname;
            residentMigstrate.lastname = req.body.lastname;
            residentMigstrate.email = req.body.email;
            residentMigstrate.gender = req.body.gender;
            residentMigstrate.phone = req.body.phone;

            residentMigstrate.profile_picture = picture;
            residentMigstrate.save()
                .then(updatedResidentMigstrate => {
                    req.flash('success', { msg: 'succesfull update ' + updatedResidentMigstrate.firstname + ' ' + updatedResidentMigstrate.lastname + ' informations' })
                    res.redirect('/residentMigstrate/edit/' + req.body.id)
                })
        })

}
exports.getResidentMigstrate = (req, resp) => {
    if (!req.user) {
        return resp.redirect('/login')

    }
    ResidentMigstrate.find({})
        .then(rm => {
            resp.render('admin/residnt magistrate/rM', {
                residentMigistrate: rm,
                mainActive: 'rma',
                subActive: 'rm'


            });
        })


}
exports.deleteResidentMigstrate = (req, res) => {
    ResidentMigstrate.remove({ _id: req.params.id })
        .then(() => {
            ResidentMigstrate.find({})
                .then(ResidentMigstrate => {
                    req.flash('success', { msg: 'succesfull delete a resident migstrate  ' })
                    res.redirect('/residentMigstrate')
                })
        })
}
exports.editResidentMigstrate = (req, res) => {
    ResidentMigstrate.findOne({
        _id: req.params.id
    }).then(ResidentMigstrate => {
        res.render('admin/residnt magistrate/editRm', {
            rm: ResidentMigstrate,
            mainActive: 'rma',
            subActive: 'rm'

        })

    })

}