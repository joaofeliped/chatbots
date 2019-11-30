var request = require('request');

function MessageSender(token) {
	this._token = token;
}

MessageSender.prototype.sendTextMessage = function(recipientId, messageText) {
	var messageData = {
		recipient: {
			id: recipientId
		},

		message: {
			text: messageText
		}
	};

	callSendAPI(messageData, this._token);
}

MessageSender.prototype.sendMenu = function(recipientId) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
		    attachment: {
		      type:'template',
		      	payload:{
		        	template_type:'button',
		        		text:'O que você gostaria de fazer?',
				        buttons:[
					          {
					            type:'postback',
					            title:'CLIENTE',
					            payload: 'clicou_abrir_ocorrencia'
					          },
					          {
					            type:'postback',
					            title:'RBM',
					            payload: 'clicou_ver_ocorrencias'
					          },
					          {
					            type:'postback',
					            title:'PROMOÇÕES',
					            payload: 'clicou_ver_ocorrencias'
					          }
				        	]
				      	}
		   	 	}
		 }  	 	
	};

	callSendAPI(messageData, this._token);
}

MessageSender.prototype.sendMenuCaroussel = function(recipientId) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
		    attachment: {
		      type:'template',
		      	payload:{
		        	template_type:'generic',
		        		elements:[
		        			{
					            title: 'CLIENTE',
					            image_url: 'https://www.director.co.uk/wp-content/uploads/2015/09/Blog-Avondale-Kevin-Uphill-Buying-Business-1000x500.jpg',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_cliente"
					              }              
					            ]
					        },
				           {
					            title: 'RBM',
					            image_url: 'https://viacarreira.com/wp-content/uploads/2017/02/como-trabalhar-no-grupo-moura-confira-3-formas-1.jpg',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_rmb"
					              }              
					            ]
					        },
					        {
					            title: 'PROMOÇÕES',
					            image_url: 'http://www.agenciaeplus.com.br/wp-content/uploads/2017/04/Promo%C3%A7%C3%B5es-rel%C3%A2mpago-podem-melhorar-as-vendas-da-sua-loja-virtual-300x151.png',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_promocoes"
					              }              
					            ]
					        },
					        {
					            title: 'FALE CONOSCO',
					            image_url: 'http://www.fatopolitico.com/wp-content/uploads/2016/03/fale-conosco.jpg',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_fale_conosco"
					              }              
					            ]
					        },
					        {
					            title: 'AGENDAMENTOS',
					            image_url: 'http://portal.promedmg.com.br/loginPortal/assets/img/bg-agendamento.jpg',
					            buttons:[
					             {
					                type:"postback",
					                title:"Escolher",
					                payload:"escolheu_agendamentos"
					              }              
					            ]
					        },
					        
        				]
		        		
				      	}
		   	 	}
		 }  	 	
	}

	callSendAPI(messageData, this._token);
}	

MessageSender.prototype.sendMenuCliente = function(recipientId) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
		    attachment: {
		      type:'template',
		      	payload:{
		        	template_type:'button',
		        		text:'O que você gostaria de fazer?',
				        buttons:[
					          {
					            type:'postback',
					            title:'Agendar troca',
					            payload: 'clicou_agendar_troca'
					          },
					          {
					            type:'postback',
					            title:'Informar incidente',
					            payload: 'clicou_informar_incidente'
					          },
					          {
					            type:'postback',
					            title:'Solicitar serviços',
					            payload: 'clicou_solicitar_servicos'
					          }
				        	]
				      	}
		   	 	}
		 }  	 	
	};

	callSendAPI(messageData, this._token);
}

MessageSender.prototype.sendCandidatosQuickReplies = function(recipientId, candidatos) {
	var respostasRapidas = transformarArrayEmRespostasRapidas(candidatos, 'clicou_em_presidente');

	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			text: 'Muito bem, qual é o seu candidato à presidência?',
		    quick_replies: respostasRapidas
		}
	};

	callSendAPI(messageData, this._token);
}

MessageSender.prototype.sendPromocoesList = function(recipientId) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			attachment: {
				type: 'template',
				payload: {
					template_type: 'list',
					top_element_style: 'compact',
					elements: [
						{
				            title: 'Bateria Moura 60ah',
				            subtitle: 'De: R$ 250,00 ' + '\n' + 'Por: R$ 190,00',
				            image_url: 'https://images-americanas.b2w.io/produtos/01/00/sku/8190/3/8190310_1SZ.jpg',
				            buttons: [
				              {
				                title: 'Comprar',
				                type: 'web_url',
				                url: 'https://www.mourafacil.com.br/',
				                messenger_extensions: true,
				                webview_height_ratio: 'tall',
				                fallback_url: 'https://www.mourafacil.com.br/'            
				              }
			            	]
			          	},
			          	{
				            title: 'Bateria Zetta Z2d Moura',
				            subtitle: 'De: R$ 220,00 ' + '\n' + 'Por: R$ 160,00',
				            image_url: 'https://images-americanas.b2w.io/produtos/01/00/sku/22142/0/22142097_1SZ.jpg',
				            buttons: [
				              {
				                title: 'Comprar',
				                type: 'web_url',
				                url: 'https://www.mourafacil.com.br/',
				                messenger_extensions: true,
				                webview_height_ratio: 'tall',
				                fallback_url: 'https://www.mourafacil.com.br/'            
				              }
			            	]
			          	}

					]
		    	}
			}
		}
	};

	callSendAPI(messageData, this._token);
}

MessageSender.prototype.sendAgendamentosList = function(recipientId) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			attachment: {
				type: 'template',
				payload: {
					template_type: 'list',
					top_element_style: 'compact',
					elements: [
						{
				            title: 'Troca de bateria',
				            subtitle: 'Data: 28/01/18' + '\n' + 'Status: Aberto',
				            image_url: 'https://images-americanas.b2w.io/produtos/01/00/sku/8190/3/8190310_1SZ.jpg',
				            
			          	},
			          	{
				            title: 'Troca de bateria',
				            subtitle: 'Data: 10/07/17' + '\n' + 'Status: Concluido',
				            image_url: 'https://images-americanas.b2w.io/produtos/01/00/sku/8190/3/8190310_1SZ.jpg',
				            
			          	}

					]
		    	}
			}
		}
	};

	callSendAPI(messageData, this._token);
}



function callSendAPI(messageData, token) {
	request({
		uri: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token: token},
		method: 'POST',
		json: messageData
	}, function(erro, response, body){
		//console.log('response ', response);
		if(!erro && response.statusCode == 200) {
			var recipientID = body.recipient_id;
			var messageID = body.message_id;
		} else {
			//console.log('erro ',erro);
		}
	});
}

function transformarArrayEmRespostasRapidas(arr, payload) {
	var respostas = [];
	
	arr.forEach(function(e){
		var resposta = {
			content_type: 'text',
            title: e.nome + ' - ' + (e.partido ?  e.partido : 'Sem partido'),
    		payload: payload            
        }

		respostas.push(resposta);
	});

	return respostas;
}

function transformarArrayEmModeloLista(arr, payload) {
	var respostas = [];
	
	arr.forEach(function(e){
		var resposta = {
            title: e.nome,
            subtitle: e.partido,
            image_url: e.imagem,
            buttons: [
              {
                title: "Escolher",
                type: "postback",
                payload: 'candidato_' + e.nome           
              }
            ]
          }

		respostas.push(resposta);
	});

	return respostas;
}

module.exports = function() {
	return MessageSender;
}