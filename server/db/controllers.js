var db = require('../db');

module.exports = {
  findOrCreateApplicant: function(applicant, query, callback) {
    return db.Applicant.find( {where: query } )
    .then(function(found) {
      if (found) {
        callback(null, found);
      } else {
        db.Applicant.create({
          email: applicant.email,
          firstname: applicant.firstname,
          lastname: applicant.lastname,
          phoneNumber: applicant.phoneNumber,
          zipCode: applicant.zipCode,
          dob: applicant.dob,
          ssn: applicant.ssn
        }).then(function(applicant) {
          callback(null, applicant);
        }).catch(function(error) {
          console.error(error);
        });
      }
    });
  }
};