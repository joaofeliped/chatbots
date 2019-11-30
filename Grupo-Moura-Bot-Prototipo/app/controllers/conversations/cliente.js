module.exports.pedirCPF = function(app, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendTextMessage(senderID, 'Por favor, informe o seu cpf');
}

module.exports.pedirLogin = function(app, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendTextMessage(senderID, 'Por favor, informe o seu login');
}

module.exports.pedirSenha = function(app, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendTextMessage(senderID, 'Por favor, informe a sua senha');
}

module.exports.enviarMenuCliente = function(app, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendTextMessage(senderID, 'Muito obrigado.');

	setTimeout(function(){
		MessageSender.sendMenuCliente(senderID);
	}, 2000);
}

module.exports.agendarDataTroca = function(app, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendTextMessage(senderID, 'Informe a data para troca');
}

module.exports.agendarHorarioTroca = function(app, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendTextMessage(senderID, 'Informe o horário para a troca');
}

module.exports.finalizarAgendamento = function(app, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendTextMessage(senderID, 'Agendamento realizado com sucesso.');
}

module.exports.informarIncidente = function(app, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendTextMessage(senderID, 'Por favor, descreva o incidente.');
}

module.exports.finalizarInformarIncidente = function(app, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendTextMessage(senderID, 'Incidente gravado com sucesso.');
}

module.exports.solicitarServico = function(app, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendTextMessage(senderID, 'Por favor, informe qual serviço você deseja.');
}

module.exports.finalizarSolicitarServico = function(app, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendTextMessage(senderID, 'Solicitação de serviço gravada com sucesso.');
}	

module.exports.enviarPromocoes = function(app, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendPromocoesList(senderID);
}	

module.exports.pedirSumarioFaleConosco = function(app, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendTextMessage(senderID, 'Por favor, informe o assunto.');
}

module.exports.pedirDescricaoFaleConosco = function(app, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendTextMessage(senderID, 'Por favor, agora descreva detalhamente a mensagem.');
}

module.exports.finalizarFaleConosco = function(app, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendTextMessage(senderID, 'Enviei sua mensagem para um de nossos atendentes, dentro de instantes você será atendido.');
}

module.exports.enviarAgendamentos = function(app, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendAgendamentosList(senderID);
}