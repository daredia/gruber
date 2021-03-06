var Sequelize = require('sequelize');
var pg = require('pg');
pg.defaults.ssl = true;

var options = {
  dialect: 'postgres',
  protocol: 'postgres',
  ssl: true
};

var DB_URL = 'postgres://zdwbewjkqlcyfo:YIJyh5_0mlw7bS0rNklOmj-a3z@ec2-23-21-193-140.compute-1.amazonaws.com:5432/d52vv1s9m7u5p4';

var db = {
  sequelize: new Sequelize(DB_URL, options)
};

db.Applicant = db.sequelize.define('Applicant', {
  email: { type: Sequelize.STRING, allowNull: false },
  firstname: { type: Sequelize.STRING, allowNull: true },
  lastname: { type: Sequelize.STRING, allowNull: true },
  phoneNumber: { type: Sequelize.STRING, allowNull: true },
  zipCode: { type: Sequelize.STRING, allowNull: true },
  dob: { type: Sequelize.DATEONLY, allowNull: true },
  ssn: { type: Sequelize.STRING, allowNull: true },
  workflow_state: { type: Sequelize.STRING, allowNull: true },
  applicationDate: { type: Sequelize.DATEONLY, allowNull: true}
});

module.exports = db;