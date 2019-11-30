var mysql = require('mysql');
var dbConfig = require('./database-config');

var poolMySQL = function() {
	return poolConnection = mysql.createPool({
		connectionLimit: dbConfig.connectionLimit,
		host: dbConfig.host,
		user: dbConfig.user,
		password: dbConfig.password,
		database : dbConfig.database
	});
}

module.exports = function() {
	return poolMySQL;
}