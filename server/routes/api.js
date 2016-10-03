var router = require('express').Router();
var db = require('../db');
var utils = require('../db/controllers');

router.get('/applicants', function(req, res) {
  db.Applicant.findAll().then(function(applicants) {
    res.status(200).json(applicants);
  });
});

router.post('/applicants', function(req, res) {
  var applicant = req.body;
  var query = { email: applicant.email };

  utils.findOrCreateApplicant(applicant, query, function(err, applicant) {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(applicant);
  });
});

module.exports = router;