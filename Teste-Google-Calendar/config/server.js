var express = require('express');
var	bodyParser = require('body-parser');
var consign = require('consign');

var app = express();

var token = process.env.TOKEN_FACEBOOK || 'EAAHZBCZAZAd2TMBAJH1G79UEC4L50oUzfwCUfTFjlzwLndEsMFZAecD9ZCa0ZADmqTo2iOauCdWMpztVJ6BSk3BvCMZBmmjb6y5vGvZBwN23N8GZApyzZCLePXMxscftagh2Ixsscdvw8BZA0JzzHRdWzBCiE5BpkQlN8xfjUiijx6JGgZCYB15o4NBC';

app.set('token', token);

app.use(bodyParser.json({}));

consign()
    .include('app/routes')
    .then('app/controllers')
    .then('app/util')
    .then('app/calendar')
    .into(app);

module.exports = app;    