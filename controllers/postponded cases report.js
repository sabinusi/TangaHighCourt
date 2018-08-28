const Cases = require('../models/cases')
const CasesHearing = require('../models/caseHearing')
exports.getPostPondedCases = (req, res) => {
    res.render('admin/reports/postponded', {
        mainActive: 'report',
        subActive: 'post',
        title: 'report',

    })
}
exports.getAllCloseCases = (req, res) => {

}