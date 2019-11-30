var express = require('express');
var consign = require('consign');

var app = express();

consign()
    .include('config/poolConnection.js')
    .then('app/consumers')
    .then('app/models')
    .then('app/util')
    .into(app);

module.exports = app;    