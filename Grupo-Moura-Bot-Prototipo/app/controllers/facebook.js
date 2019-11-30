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
						case 'informa_cpf':
							estados[senderID] = '';

							app.app.controllers.conversations.cliente.enviarMenuCliente(app, token, senderID);
						break;

						case 'informa_login':
							estados[senderID] = 'informa_senha';

							app.app.controllers.conversations.cliente.pedirSenha(app, token, senderID);
						break;

						case 'informa_senha':
							estados[senderID] = '';

							app.app.controllers.conversations.cliente.enviarMenuCliente(app, token, senderID);
						break;

						case 'informa_data_troca':
							estados[senderID] = 'informa_horario_troca';

							app.app.controllers.conversations.cliente.agendarHorarioTroca(app, token, senderID);
						break;
						
						case 'informa_horario_troca':
							estados[senderID] = '';

							app.app.controllers.conversations.cliente.finalizarAgendamento(app, token, senderID);
						break;			

						case 'informa_incidente':
							estados[senderID] = '';

							app.app.controllers.conversations.cliente.finalizarInformarIncidente(app, token, senderID);
						break;

						case 'solicita_servico':
							estados[senderID] = '';

							app.app.controllers.conversations.cliente.finalizarSolicitarServico(app, token, senderID);
						break;		

						case 'informa_sumario_fale_conosco':
							estados[senderID] = 'informa_descricao_fale_conosco';

							app.app.controllers.conversations.cliente.pedirDescricaoFaleConosco(app, token, senderID);
						break;

						case 'informa_descricao_fale_conosco':
							estados[senderID] = '';

							app.app.controllers.conversations.cliente.finalizarFaleConosco(app, token, senderID);
						break;

						default:
							app.app.controllers.conversations.boasVindas.enviarMenuInicial(app, token, senderID);
					}
				} else {
					app.app.controllers.conversations.boasVindas.mensagemDeBoasVindas(app, token, senderID, user);
				}
			} else if(event.postback && event.postback.payload) {
				switch(event.postback.payload) {
					case 'clicou_comecar':
						estados[senderID] = '';

						app.app.controllers.conversations.boasVindas.mensagemDeBoasVindas(app, token, senderID, user);
					break;

					case 'escolheu_cliente':
						estados[senderID] = 'informa_cpf';

						app.app.controllers.conversations.cliente.pedirCPF(app, token, senderID);
					break;

					case 'escolheu_rmb':
						estados[senderID] = 'informa_login';

						app.app.controllers.conversations.cliente.pedirLogin(app, token, senderID);
					break;

					case 'clicou_agendar_troca':
						estados[senderID] = 'informa_data_troca';

						app.app.controllers.conversations.cliente.agendarDataTroca(app, token, senderID);
					break;

					case 'clicou_informar_incidente':
						estados[senderID] = 'informa_incidente';

						app.app.controllers.conversations.cliente.informarIncidente(app, token, senderID);
					break;
					
					case 'clicou_solicitar_servicos':
						estados[senderID] = 'solicita_servico';

						app.app.controllers.conversations.cliente.solicitarServico(app, token, senderID);
					break;

					case 'escolheu_promocoes':
						app.app.controllers.conversations.cliente.enviarPromocoes(app, token, senderID);
					break;

					case 'escolheu_fale_conosco':
						estados[senderID] = 'informa_sumario_fale_conosco';

						app.app.controllers.conversations.cliente.pedirSumarioFaleConosco(app, token, senderID);
					break;

					case 'escolheu_agendamentos':
						app.app.controllers.conversations.cliente.enviarAgendamentos(app, token, senderID);
					break;

					default:
						app.app.controllers.conversations.boasVindas.enviarMenuInicial(app, token, senderID);
				}

			} else if(message && message.quick_reply && message.quick_reply.payload) {
				switch(message.quick_reply.payload) {
					
					
					default:
						app.app.controllers.conversations.boasVindas.enviarMenuInicial(app, token, senderID);
				}
			} else if(message.attachments) {
				switch(message.attachments[0].type) {
					
					default:
						app.app.controllers.conversations.boasVindas.enviarMenuInicial(app, token, senderID);
				}
			}
		} else {
			console.log(erro);
		}
	});
}