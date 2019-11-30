'use strict';

function Pessoas(poolConnection) {
	this._poolConnection = poolConnection;
}

Pessoas.prototype.buscarEmailsDoGrupoResponsavel = function(grupoResponsavel, callback) {
	this._poolConnection.getConnection(function(err, conn){
		conn.query('select fnd_pessoa.email from relacao_grupo_atendimento_pessoa inner join' + 
			' fnd_pessoa on relacao_grupo_atendimento_pessoa.membro_id = fnd_pessoa.requestID where relacao_grupo_atendimento_pessoa.grupo_atendimento_id = ?', 
			[grupoResponsavel], function(err, result) {
			
			conn.release();	

			if(err) {
				//logger.error(err);
				throw err;
			} 
	        
	        callback(result);
		});
	});
}

Pessoas.prototype.buscarUsuarioPorEmail = function(email, callback) {
	this._poolConnection.getConnection(function(err, conn){
		conn.query('select requestID from fnd_pessoa where lower(email) = lower(?)', 
			[email], function(err, result) {
			
			conn.release();	

			if(err) {
				//logger.error(err);
				throw err;
			} 
	        
	        callback(result);
		});
	});
}

Pessoas.prototype.buscarUsuarioPorIDFacebook = function(facebookID, callback) {
	this._poolConnection.getConnection(function(err, conn){
		conn.query('select requestID from fnd_pessoa where facebook_messenger_id = ?', 
			[facebookID], function(err, result) {
			
			conn.release();	

			if(err) {
				//logger.error(err);
				throw err;
			} 
	        
	        callback(result);
		});
	});
}

Pessoas.prototype.cadastrarUsuario = function(usuario, callback) {
	this._poolConnection.getConnection(function(err, conn){
		conn.query('insert into fnd_pessoa (data_criacao, ativo, apelido, email, nome_completo, password, perfil_id, facebook_messenger_id) values (now(), true, ?, ?, ?, ?, ?, ?)', 
				[usuario.apelido, usuario.email, usuario.nome_completo, usuario.password, usuario.perfil_id, usuario.facebook_messenger_id], function(err, result) {
			
			conn.release();		
					
			if(err) {
				//logger.error(err);
				throw err;
			}

			callback(result);
		});
	});
}

Pessoas.prototype.atualizarIdFacebook = function(facebookID, email, callback) {
	this._poolConnection.getConnection(function(err, conn){
		conn.query('update fnd_pessoa set facebook_messenger_id = ? where lower(email) = lower(?)', [facebookID, email], function(err, result) {
			
			conn.release();

			if(err) {
				//logger.error(err);
				throw err;
			}
			
			callback(result);
		});
	});
}

module.exports = function() {
	return Pessoas;
}