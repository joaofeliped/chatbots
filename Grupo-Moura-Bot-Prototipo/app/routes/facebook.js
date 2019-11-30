module.exports = function(app) {
	app.post('/fb', function(req, res){
	   app.app.controllers.facebook.enviarMensagem(app, req, res);
	});

	app.get('/fb', function(req, res) {
	   app.app.controllers.facebook.verificarToken(app, req, res);
	});
}