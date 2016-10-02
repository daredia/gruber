// MODULES ============================================
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

// CONFIGURATION ======================================
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../node_modules'));

module.exports = app;