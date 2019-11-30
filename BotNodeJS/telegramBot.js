const TelegramBot = require('node-telegram-bot-api');
const token = '378597016:AAHJdSNNVEPP5o4YnBIXIWqvtVXBLiA3Er4';
const bot = new TelegramBot(token, {polling: true});

var mysql = require('mysql');

var conn = mysql.createConnection({
	host: '169.53.70.85',
	user: 'root',
	password: 'evo#admin#',
	database : 'dev_siom'
});

function conectar() {
	conn.connect(function(err){
		if(err) {
			throw err;
		}

		console.log('Connected');
	});
}

bot.on('error', function() {
	console.log('erro');
})

bot.onText(/\/start/, (msg) => {

	bot.sendMessage(msg.chat.id, `Bem vindo ${msg.chat.first_name}, Informe o nome de um cargo para cadastrar no siom`, {
		"reply_markup": {
		    "keyboard": [["Gerente"], ["Diretor"], ["Estagiário"]]
		    }
		   
	});
   
});

bot.on('message', (msg) => {
    console.log(msg);
	if(msg.text !== undefined && !msg.text.toLowerCase().includes('/start')) {
		
		bot.sendMessage(msg.chat.id,"Cadastrando novo cargo no siom...");

		//cadastrarCargo(msg, msg.text);
		
		//setTimeout(function() {

		//	bot.sendMessage(msg.chat.id,'<strong>Se desejar cadastrar outro cargo, informe outro nome.</strong>',{parse_mode : 'HTML'});	
		//}, 1000);
	} 
    
});

function cadastrarCargo(msg, nome) {
	var novoID; 

	conn.query('insert into fnd_cargo (data_criacao, nome, criado_por, empresa_id) values (now(), ?, 1, 1)', [nome], function(err, result) {
		if(err) {
			throw err;
		}

		novoID = result.insertId;

		//setTimeout(function() {
			buscarCargo(msg, result.insertId, msg.chat.first_name);
		//}, 1000);
	});
	
	//console.log('id fora da query ', novoID);

	//return novoID;
}

function buscarCargo(msg, id, usuario) {
	console.log('id buscado ', id);
	var text = '';

	conn.query('select * from fnd_cargo where requestID = ?', [id], function(err, result) {
		if(err) {
			throw err;
		}

		cargo = result[0];

		console.log(cargo);

		text = 'Novo cargo adicionado! \n id = ' + id + '\n Nome: ' + cargo.nome + '\n Data de criação: ' + cargo.data_criacao + '\n Criado por: ' 
		  	+ usuario;

		 bot.sendMessage(msg.chat.id,text); 	
	});

	return text;
}