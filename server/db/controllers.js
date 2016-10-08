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
          ssn: applicant.ssn || found.ssn,
          workflow_state: applicant.workflow_state || found.workflow_state,
          applicationDate: applicant.applicationDate || found.applicationDate
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
  },

  queryFunnel: function(dateRange, callback) {
    var query = "SELECT TO_CHAR(date_trunc('week', \"applicationDate\"), 'YYYY-MM-DD') ";
    query += "|| '-' || TO_CHAR(date_trunc('week', \"applicationDate\") + '6 days', 'YYYY-MM-DD') ";
    query += "AS period, workflow_state, COUNT(*) FROM \"Applicants\" ";
    query += "WHERE TO_CHAR(date_trunc('week', \"applicationDate\"), 'YYYY-MM-DD') >= '" + dateRange.start_date;
    query += "' AND TO_CHAR(date_trunc('week', \"applicationDate\"), 'YYYY-MM-DD') <= '" + dateRange.end_date;
    query += "' GROUP BY period, workflow_state";

    return db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT })
    .then(function(results) {
      var response = {};
      
      results.forEach(function(result) {
        if (response[result.period]) {
          response[result.period][result.workflow_state] = Number(result.count);
        } else {
          response[result.period] = {
            [result.workflow_state]: Number(result.count)
          };
        }
      });

      callback(null, response);
    }).catch(function(error) {
      console.error(error);
    });
  }
};