var express = require('express');
var	bodyParser = require('body-parser');
var consign = require('consign');

var app = express();

var token = process.env.TOKEN_FACEBOOK || 'EAAWfgYpnIAsBANjZCEe7GXe0nZCAxruR7fpK5Wuo715Jeb02km5Qsz3kkOPf5RmZAlxXkzdK9MzUTmHM8zQjbaAdQssp1UeeTTNngZA9uBGnwbNtSDNbsp0dVfrdIMYGKUOMIf1g8nDzo43C0HxZAM6Rrha0HwXbXFPUka1YMJk1sK3zIEuku';

app.set('token', token);

app.use(bodyParser.json({}));

consign()
    .include('app/routes')
    .then('app/controllers')
    .then('app/util')
    .into(app);

module.exports = app;