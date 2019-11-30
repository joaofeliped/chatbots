module.exports.mensagemDeBoasVindas = function(app, token, senderID, user) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendTextMessage(senderID, 'Olá, ' + user.first_name + ' ' + user.last_name + 
		', seja bem vindo. Como posso te ajudar?');

	setTimeout(function(){
		MessageSender.sendMenuCaroussel(senderID);
	}, 2000);
}

module.exports.enviarMenuInicial = function(app, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendTextMessage(senderID, 'Como posso te ajudar?');

	setTimeout(function(){
		MessageSender.sendMenuCaroussel(senderID);
	}, 2000);
}