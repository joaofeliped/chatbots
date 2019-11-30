var request = require('request');

var estados = [];
var contadorDe = 0;
const contadorAte = 4;


module.exports.verificarToken = function(app, req, res) {
	if (req.query['hub.verify_token'] === app.get('token')) {
      res.send(req.query['hub.challenge']);
   	} else {
      res.send('Error, wrong validation token');
   	}
}

module.exports.enviarMensagem = function(app, req, res) {
	var data = req.body;

	if(data && data.object === 'page') {
		data.entry.forEach(function(entry){
	  		var pageID = entry.id;
			var timeOfEvent = entry.time;

			entry.messaging.forEach(function(event) {
				if(event.message || event.postback) {
					trataMensagem(app, event, app.get('token'));
				} 
			});
		});
	}

   	res.send(req.body);
} 

function trataMensagem(app, event, token) {
	var senderID = event.sender.id;
	var recepientID = event.recipient.id;
	var message = event.message;
	
	request({
		uri: 'https://graph.facebook.com/v2.6/' + senderID 
			+ '?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=' + token,
		method: 'GET'
	}, function(erro, response, body){
		if(!erro && response.statusCode == 200) {
			var user = JSON.parse(body);
			
			if(message && message.text && !message.quick_reply) {
				if(estados[senderID]) {
					switch(estados[senderID]) {
						case 'informa_motivo_nao_marcacao':
							estados[senderID] = '';

							app.app.controllers.conversations.agendamento.recebeMotivoNaoMarcacao(app, token, senderID);
						break;

						default:
							app.app.controllers.conversations.agendamento.iniciar(app, token, senderID, user);
					}
				} else {
					app.app.controllers.conversations.agendamento.iniciar(app, token, senderID, user);
				}
			} else if(event.postback && event.postback.payload) {
				switch(event.postback.payload) {
					case 'clicou_comecar':
						app.app.controllers.conversations.agendamento.iniciar(app, token, senderID, user);
					break;

					case 'clicou_agendar':
						estados[senderID] = '';

						app.app.controllers.conversations.agendamento.agendar(app, token, senderID);
					break;

					case 'clicou_produtos':
						estados[senderID] = '';

						app.app.controllers.conversations.produtos.exibirProdutos(app, token, senderID);
					break;
				}
			}  else if(message && message.quick_reply && message.quick_reply.payload) {
				var tokens = message.quick_reply.payload.split('?');

				switch(tokens[0]) {
					case 'clicou_marcar':
						app.app.controllers.conversations.agendamento.iniciarAgendamento(app, token, senderID, user);
					break;

					case 'escolheu_dia':
						app.app.controllers.conversations.agendamento.enviarHorariosDisponiveis(app, token, senderID, tokens[1]);
					break;

					case 'clicou_horario':
						app.app.controllers.conversations.agendamento.finalizarAgendamento(app, token, senderID, tokens[1]);
					break;

					case 'clicou_nao_marcar':
						app.app.controllers.conversations.agendamento.confirmarNaoMarcacao(app, token, senderID);
					break;

					case 'clicou_certeza_nao_marcar':
						estados[senderID] = 'informa_motivo_nao_marcacao';

						app.app.controllers.conversations.agendamento.perguntarMotivoNaoMarcacao(app, token, senderID);
					break;
				}
			} else if(message.attachments) {
				
			}
		} else {
			console.log(erro);
		}
	});
}