var request = require('request');

function MessageSender(token) {
	this._token = token;
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
		        		text:'Como posso te ajudar?',
				        buttons:[
					          {
					            type:'postback',
					            title:'Agendar',
					            payload: 'clicou_agendar'
					          },
					          {
					            type:'postback',
					            title:'Produtos',
					            payload: 'clicou_produtos'
					          }
				        	]
				      	}
		   	 	}
		 }  	 	
	};

	callSendAPI(messageData, this._token);
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


MessageSender.prototype.sendQuickReplySimNao = function(recipientId) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			text: 'Estou vendo aqui que está na hora de trocar a vela do seu filtro. Vamos agendar o dia da troca?',
		    quick_replies: [
		    	{
		    		content_type: 'text',
           			title: 'Vamos agendar',
    				payload: 'clicou_marcar'   
    			},
    			{
		    		content_type: 'text',
           			title: 'Não, obrigado',
    				payload: 'clicou_nao_marcar'   
    			},
		    ]
		}
	};

	callSendAPI(messageData, this._token);
}

MessageSender.prototype.sendQuickReplyCertezaDeNaoMarcacao = function(recipientId) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			text: 'Tem certeza que não quer marcar?',
		    quick_replies: [
		    	{
		    		content_type: 'text',
           			title: 'Tenho certeza',
    				payload: 'clicou_certeza_nao_marcar'   
    			},
    			{
		    		content_type: 'text',
           			title: 'Quero agendar',
    				payload: 'clicou_marcar'   
    			},
		    ]
		}
	};

	callSendAPI(messageData, this._token);
}

MessageSender.prototype.sendQuickReplyHorarios = function(recipientId) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			text: 'Eu tenho os seguintes horários para essa data',
		    quick_replies: [
		    	{
		    		content_type: 'text',
           			title: '09:00',
    				payload: 'clicou_horario?09:00'   
    			},
    			{
		    		content_type: 'text',
           			title: '10:00',
    				payload: 'clicou_horario?10:00'   
    			},
    			{
		    		content_type: 'text',
           			title: '14:00',
    				payload: 'clicou_horario?14:00'   
    			},
    			{
		    		content_type: 'text',
           			title: '16:00',
    				payload: 'clicou_horario?16:00'   
    			},
    			{
		    		content_type: 'text',
           			title: '17:00',
    				payload: 'clicou_horario?17:00'   
    			},
		    ]
		}
	};

	callSendAPI(messageData, this._token);	
}

MessageSender.prototype.sendQuickReplyDataInicial = function(app, recipientId, datas) {
	var respostasRapidas = transformarArrayDatasEmRespostasRapidas(app, datas);

	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			text: 'Eu tenho os seguintes dias para agendar',
		    quick_replies: respostasRapidas
		}
	};

	callSendAPI(messageData, this._token);
}

MessageSender.prototype.sendQuickReplyDataFinal = function(recipientId) {
	var messageData = {
		recipient: {
			id: recipientId
		},
		message: {
			text: 'Informe a data final',
		    quick_replies: [
		    	{
		    		content_type: 'text',
           			title: 'Mesmo dia',
    				payload: 'clicou_mesmo_dia'   
    			},
		    ]
		}
	};

	callSendAPI(messageData, this._token);
}

MessageSender.prototype.sendProdutosList = function(recipientId) {
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
				            title: 'Filtro',
				            subtitle: 'R$ 1.080,00 - Purificador de Água SOFT SLIM PRETO (N) 220 V',
				            image_url: 'http://www.mundodosfiltros.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/s/o/soft_slim_preto_inst..jpg',
				            buttons: [
				              {
				                title: 'Comprar',
				                type: 'web_url',
				                url: 'http://www.mundodosfiltros.com/purificador-de-agua-soft-slim-preto-n-220v',
				                messenger_extensions: true,
				                webview_height_ratio: 'tall',
				                fallback_url: 'http://www.mundodosfiltros.com'            
				              }
				            ]
				        },
				        {
				            title: 'Climatizador de Ar',
				            subtitle: 'R$ 229,90 - Candence CLI302',
				            image_url: 'http://www.mundodosfiltros.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/l/climatizador-cadence-umidificador-frio-compact-cli-302-photo200935285-12-33-3b.jpg',
				            buttons: [
				              {
				                title: 'Comprar',
				                type: 'web_url',
				                url: 'http://www.mundodosfiltros.com/climatizador-de-ar-candence-cli302',
				                messenger_extensions: true,
				                webview_height_ratio: 'tall',
				                fallback_url: 'http://www.mundodosfiltros.com'            
				              }
				            ]
				        },
				        {
				            title: 'Forno eletrico',
				            subtitle: 'R$ 219,00 - Best 28 lts',
				            image_url: 'http://www.mundodosfiltros.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/f/o/forno-eletrico-28-litros-best.png',
				            buttons: [
				              {
				                title: 'Comprar',
				                type: 'web_url',
				                url: 'http://www.mundodosfiltros.com/forno-eletrico-best-28-lts',
				                messenger_extensions: true,
				                webview_height_ratio: 'tall',
				                fallback_url: 'http://www.mundodosfiltros.com'            
				              }
				            ]
				        },
				        {
				            title: 'Sanduicheira',
				            subtitle: 'R$ 39,90 - grill LENDEX',
				            image_url: 'http://www.mundodosfiltros.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/s/a/sanduicheira_lendex.jpg',
				            buttons: [
				              {
				                title: 'Comprar',
				                type: 'web_url',
				                url: 'http://www.mundodosfiltros.com/sanduicheira-grill-lendex',
				                messenger_extensions: true,
				                webview_height_ratio: 'tall',
				                fallback_url: 'http://www.mundodosfiltros.com'            
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

function transformarArrayDatasEmRespostasRapidas(app, arr) {
	var respostas = [];
	
	arr.forEach(function(e){
		var resposta = {
			content_type: 'text',
            title: app.app.util.dateUtil.dataFormatada(e, 'YYYY-MM-DD', 'DD/MM'),
    		payload: 'escolheu_dia?' + e          
        }

		respostas.push(resposta);
	});

	return respostas;
}


function callSendAPI(messageData, token) {
	request({
		uri: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token: token},
		method: 'POST',
		json: messageData
	}, function(erro, response, body){
		//console.log(response);
		if(!erro && response.statusCode == 200) {
			var recipientID = body.recipient_id;
			var messageID = body.message_id;
		} else {
			//console.log(erro);
		}
	});
}

module.exports = function() {
	return MessageSender;
}