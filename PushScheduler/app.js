var app = require('./config/server');

var schedule = require('node-schedule');
 
var j = schedule.scheduleJob('/1 * * * * *', function(){
	app.app.consumers.rotinasConsumer.pesquisarRotinas(app);
});

