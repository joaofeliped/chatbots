const TelegramBot = require('node-telegram-bot-api');
const token = '378597016:AAHJdSNNVEPP5o4YnBIXIWqvtVXBLiA3Er4';
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {

	bot.sendMessage(msg.chat.id, `Bem vindo ao bot 2`);
   
});

bot.on('message', (msg) => {
    
	if(msg.text !== undefined && !msg.text.toLowerCase().includes('/start')) {
		
		bot.sendMessage(msg.chat.id, 'Aqui é o bot 2');
	} 
    
});