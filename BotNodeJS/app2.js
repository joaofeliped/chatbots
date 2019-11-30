var mysql = require('mysql');
var email = require('nodemailer');

var novoID;

var conn = mysql.createConnection({
	host: '169.53.70.85',
	user: 'root',
	password: 'evo#admin#',
	database : 'dev_siom'
});

var transporter = email.createTransport({
  service: 'sendgrid',
  auth: {
    user: 'apikey',
    pass: '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'
  }
});

conn.connect(function(err){
	if(err) {
		throw err;
	}

	console.log('Connected');
});


conn.query('insert into fnd_cargo (data_criacao, nome, criado_por, empresa_id) values (now(), "Teste 2", 1, 1)', function(err, result) {
	if(err) {
		throw err;
	}

	console.log(result);

	novoID = result.insertId;

	console.log(novoID);

	enviarEmail(novoID);
});

function enviarEmail(id) {
	var cargo;	

	conn.query('select * from fnd_cargo where requestID = ?', [id], function(err, result) {
		if(err) {
			throw err;
		}

		console.log(result);

		cargo = result[0];

		var mailOptions = {
		  from: 'info@siomweb.com.br',
		  to: 'jo_5919@hotmail.com, rodrigo.barcat@clubee.com.br, marcelo.ferraz@clubee.com.br',
		  subject: 'Novo cargo via Node.js',
		  text: 'Novo cargo adicionado! \n id = ' + id + '\n Nome: ' + cargo.nome + '\n Data de criação: ' + cargo.data_criacao + '\n Criado por: ' 
		  	+ cargo.criado_por + '\n Empresa: ' + cargo.empresa_id
		};

		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    console.log(error);
		  } else {
		    console.log('Email sent: ' + info.response);
		  }
		});y

		conn.end();
	});
}



