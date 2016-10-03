var app = require('./config');
var db = require('./db');
var port = process.env.PORT || 4568;

db.sequelize.sync().then(function() {
  app.listen(port);
  console.log('Server now listening on port', port);
});