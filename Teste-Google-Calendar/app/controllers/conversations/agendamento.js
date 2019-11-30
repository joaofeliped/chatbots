var evento;

module.exports.iniciar = function(app, token, senderID, user) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendTextMessage(senderID, 'Olá, ' + user.first_name + ' ' + 
		user.last_name + '. Bem vindo ao assistente virtual do Mundo dos Filtros.'); 

	setTimeout(function(){
		MessageSender.sendMenu(senderID);
	}, 2000);
}

module.exports.agendar = function(app, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendQuickReplySimNao(senderID);
}

module.exports.confirmarNaoMarcacao = function(app, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendTextMessage(senderID, 'A troca da vela do filtro é muito importante' +
	 ' para não comprometer a qualidade da água e, consequentemente, a saúde das pessoas.'); 

	setTimeout(function(){
		MessageSender.sendQuickReplyCertezaDeNaoMarcacao(senderID);
	}, 2000);
}

module.exports.perguntarMotivoNaoMarcacao = function(app, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendTextMessage(senderID, 'Tudo bem então, poderia me dizer o motivo de você não querer marcar a troca da sua vela?'); 
}

module.exports.recebeMotivoNaoMarcacao = function(app, token, senderID) {
	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendTextMessage(senderID, 'Muito obrigado pela sua resposta.'); 
}

module.exports.iniciarAgendamento = function(app, token, senderID, user) {
	configurarEvento(user);

	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendQuickReplyDataInicial(app, senderID, app.app.util.dateUtil.criarArrayDeDiasUteis(5));
}

module.exports.enviarHorariosDisponiveis = function(app, token, senderID, dataEscolhida) {
	evento.start.dateTime =  new Date(dataEscolhida);
	evento.end.dateTime =  new Date(dataEscolhida);

	var MessageSender = new app.app.controllers.MessageSender(token);

	MessageSender.sendQuickReplyHorarios(senderID);
}

module.exports.finalizarAgendamento = function(app, token, senderID, horarioEscolhido) {
	var tokens = horarioEscolhido.split(':');

	evento.start.dateTime.setHours(tokens[0]);
	evento.start.dateTime.setMinutes(tokens[1]);
	evento.start.dateTime.setSeconds(0);

	evento.end.dateTime.setHours(Number(tokens[0]) + 1);
	evento.end.dateTime.setMinutes(tokens[1]);
	evento.end.dateTime.setSeconds(0);

	var MessageSender = new app.app.controllers.MessageSender(token);

	app.app.calendar.calendarManager.criarEvento(evento, function(){
		var MessageSender = new app.app.controllers.MessageSender(token);

		MessageSender.sendTextMessage(senderID, 'Está agendado para a data ' + 
			app.app.util.dateUtil.dataFormatada(evento.start.dateTime, 'YYYY-MM-DD', 'DD/MM/YYYY') + 
			' às ' + tokens[0] + ':' + tokens[1] + '.');
	});
}

function configurarEvento(user) {
	evento = {};
	evento.start = {};
	evento.end = {};
	evento.summary = 'Troca de vela do filtro do cliente ' + user.first_name + ' ' + 
		user.last_name;
}