var app = require('./config/server');

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
    console.log("Servidor ON");
});