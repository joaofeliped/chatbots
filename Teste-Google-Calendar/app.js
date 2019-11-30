var app = require('./config/server');

/*app.set('port', process.env.PORT || 4001);

app.listen(app.get('port'), function(){
    console.log("Servidor ON");
});*/

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('/usr/lib/jvm/java-8-oracle/bin/siomweb_com_br.key', 'utf8');
var certificate = fs.readFileSync('/usr/lib/jvm/java-8-oracle/bin/siomweb_com_br.crt', 'utf8');
var app = require('./config/server');

var credentials = {key: privateKey, cert: certificate};

app.set('port', process.env.PORT || 3010);

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(app.get('port'));