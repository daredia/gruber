var db = require('../db');

module.exports = {
  updateOrCreateApplicant: function(applicant, query, callback) {
    var config;
    return db.Applicant.find( {where: query } )
    .then(function(found) {
      if (found) {
        config = {
          email: applicant.email,
          firstname: applicant.firstname || found.firstname,
          lastname: applicant.lastname || found.lastname,
          phoneNumber: applicant.phoneNumber || found.phoneNumber,
          zipCode: applicant.zipCode || found.zipCode,
          dob: applicant.dob || found.dob,
          ssn: applicant.ssn || found.ssn
        };

        found.update(config)
        .then(function() {
          callback(null, found);
        });
      } else {
        config = {
          email: applicant.email,
          firstname: applicant.firstname || null,
          lastname: applicant.lastname || null,
          phoneNumber: applicant.phoneNumber || null,
          zipCode: applicant.zipCode || null,
          dob: applicant.dob || null,
          ssn: applicant.ssn || null
        };

        db.Applicant.create(config)
        .then(function(applicant) {
          callback(null, applicant);
        }).catch(function(error) {
          console.error(error);
        });
      }
    });
  }
};