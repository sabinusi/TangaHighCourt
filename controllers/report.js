const Cases = require('../models/cases')
const CasesHearing = require('../models/caseHearing')
exports.getClosedCases = (req, res) => {
    res.render('admin/reports/report', {
        mainActive: 'report',
        subActive: 'closed',
        title: 'report',

    })
}
exports.getAllCloseCases = (req, res) => {

}