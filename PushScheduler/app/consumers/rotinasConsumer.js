module.exports.pesquisarRotinas = function(app) {
	var poolConnection = app.config.poolConnection();
	var Rotinas = new app.app.models.Rotinas(poolConnection);

	Rotinas.buscarRotinas(function(result){
		console.log(new Date());
		console.log(result);
	});
}