module.exports.exibirProdutos = function(app, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendProdutosList(senderID);
}