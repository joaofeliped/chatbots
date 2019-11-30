var Parse = require('parse/node');
var moment = require('moment');

Parse.initialize('9BqbXUJXvMg7gDJi1bazZ7wIWVg1OMaCK73By0vi', 'kH6c0sx4JxbRC9JsGzN0pcBhwR95RzBWgCi2eVff', '4R3pniIUTQXRI3u5bxSEheJnWU25OYT9PPaLnsS8');
Parse.serverURL = 'https://parseapi.back4app.com/';

var Servicos = Parse.Object.extend('Services');
var query = new Parse.Query(Servicos);
query.find({
	success: function(results) {
		var servicos = [];
		for(var i = 0; i < results.length; i++) {
			servicos.push(new Service(results[i]));
		}

		console.log(new Service(results[0]));
		

		//console.log(getPossibleSlots(servico, new Date()));
	}, 
	error: function(error) {
		console.log(error);
	}
});

var Barbeiros = Parse.Object.extend('Barbers');
var query = new Parse.Query(Barbeiros);

query.equalTo("name", "CARLOS");
query.find({
	success: function(results) {
		var barbeiros = [];
		for(var i = 0; i < results.length; i++) {
			barbeiros.push(new Barber(results[i]));
		}

		//console.log(barbeiros);
	}, 
	error: function(error) {
		console.log(error);
	}
});

var Schedules = Parse.Object.extend('Schedules');
var query = new Parse.Query(Schedules);
query.find({
	success: function(results) {
		var horarios = [];
		for(var i = 0; i < results.length; i++) {
			//console.log(new Schedule(results[i]).clientName);
			horarios.push(new Schedule(results[i]));
		}
		//console.log(horarios);
	}, error: function(error) {
	}
});

function cleanByDate(date, barber) {
	var currentDate = date.getDay() + 1;
	var result = [];
	for (var i=0; i < barber.hours.length; i += 1) {
		var day = barber.hours[i].split("/")[0];
		if (day == currentDate) {
			result.push(barber.hours[i]);
		}
	}
	return result;
}

function newScheduleHoursGetBarbers(horarioEscolhido, servicosEscolhidos, dataEscolhida, callback, listaDeBarbeiros) {
	var timeSlots = generateTimeSlots(_chosenHour, servicosEscolhidos);
	var initalTime = dataEscolhida.clone().set({'hour': 1, 'minutes': 0});
	var finalTime = dataEscolhida.clone().set({'hour': 23, 'minutes': 30});
	var Schedules = Parse.Object.extend('Schedules');
	var query = new Parse.Query(Schedules);
	query.greaterThanOrEqualTo('date', initalTime.toDate());
	query.lessThanOrEqualTo('date', finalTime.toDate());
	query.notEqualTo('status', 'Cancelado');
	var barbersNotAvailable = [];
	var barbers = listaDeBarbeiros;
	for (var i=0; i<servicosEscolhidos.length; i++) {
		var service = servicosEscolhidos[i];
		for (var j=0; j< barbers.length; j++) {
			if (!barbers[j].services.includes(service.name)) {
				if (!barbersNotAvailable.includes(barbers[j].id)) {
					barbersNotAvailable.push(barbers[j].id);
				}
			}
		}
	}
	for (var i=0; i<timeSlots.length; i++) {
		var slot = timeSlots[i];
		for (var j=0; j< barbers.length; j++) {
			if (!barbers[j].hours.includes(slot)) {
				if (!barbersNotAvailable.includes(barbers[j].id)) {
					barbersNotAvailable.push(barbers[j].id);
				}
			}
		}
	}
	query.find({
	  success: function(results) {
			for (var i=0; i<results.length; i++) {
				var currentBarber = results[i].get('barber').id;
				if (barbersNotAvailable.includes(currentBarber)) {
					continue;
				}
				var horarios = results[i].get('hours');
				for(var j=0; j<timeSlots.length; j++) {
					var slot = timeSlots[j];
					if (horarios.includes(slot)) {
						barbersNotAvailable.push(currentBarber);
						break;
					}
				}
			}
			var possibleBarbers = [];
			for (var i=0; i<barbers.length;i++) {
				if (!barbersNotAvailable.includes(barbers[i].id)) {
					possibleBarbers.push(barbers[i]);
				}
			}
			callback(possibleBarbers);
	  },
	  error: function(error) {
  	}
	});
}


function Barber (object) {
	this.parseObj = object;
	this.id = object.id;
	this.birthday = object.get('born_date');
	this.bio = object.get('bio');
	this.name = object.get('name');
	this.services = object.get('services');
	this.hours = object.get('hours');
	this.image = object.get('picture');
}

function Service (object) {
	this.id = object.id;
	this.name = object.get('name');
	this.price = object.get('price');
	this.priority = object.get('priority');
	this.duration = object.get('duration');
}

function Schedule (object) {
	this.id = object.id;
	this.state = object.get('state');
	this.date = object.get('date');
	this.services = object.get('services');
	this.barber = new Barber(object.get('barber'));
	if (object.get('user') != undefined) {
		this.user = new User(object.get('user'));
	}
	this.hours = object.get('hours');
	this.clientName = object.get('user_name');
	this.clientPhone = object.get('user_phone');
}


function calculateIntervals(services) {
	var result = 0;
	var duration = 0;
	for (var i=0; i< services.length; i += 1) {
		duration += services[i].duration;
		result += services[i].duration / 30;
	}
	return result;
}

function getPossibleSlots(servicosEscolhidos, dataEscolhida) {
	var date = moment(dataEscolhida, 'YYYY-MM-DD');
	var initalTime = moment();
	var slots = [];
	if (initalTime.dayOfYear() !== date.dayOfYear()) {
		initalTime = _chosenDate.clone();
		initalTime.hour(8);
		initalTime.minutes(30);
	}
	var finalTime = null;
	if (initalTime.day() === 6) {
		finalTime = initalTime.clone().hour(18).minutes(00);
	} else {
		finalTime = initalTime.clone().hour(20).minutes(00);
	}
	if (initalTime.minutes() < 30) {
		initalTime.minutes(30);
	} else {
		initalTime.add(30, 'minutes').minutes(0);
	}
	if (initalTime.day() > 0) {
		do {
			var hour = initalTime.day() + 1;
			slots.push(hour + '/' + initalTime.format('HH:mm'));
			initalTime.add(30, 'minutes')
		} while(initalTime.isBefore(finalTime));
	} else {
		console.log("Não é possível realizar agendamentos aos domingos");
	}
	slots = cleanPossibleHours(slots, calculateIntervals(servicosEscolhidos));
	return slots;
}


function cleanPossibleHours(horarios, usedSlots) {
	var horariosValidos = [];
	var firstHorario = horarios[0];
	horarios.splice(0,1);
	horariosValidos.push(firstHorario);
	var horaMinutos = firstHorario.split('/')[1].split(':');
	var lastHour = parseInt(horaMinutos[0]);
	var lastMinute = parseInt(horaMinutos[1]);
	for (var i=0; i<horarios.length; i += 1) {
		var horaMinutosNovo = horarios[i].split('/')[1].split(':');
		var newHour = parseInt(horaMinutosNovo[0]);
		var newMinute = parseInt(horaMinutosNovo[1]);
		var nextHour = 1 + lastHour;
		if  (lastHour == newHour || (nextHour === newHour && lastMinute === 30 && newMinute === 0)) {
    } else {
			popStack(horariosValidos,usedSlots);
    }
		horariosValidos.push(horarios[i]);
		lastHour = newHour;
		lastMinute = newMinute;
	}
	popStack(horariosValidos,usedSlots);
	return horariosValidos;
}

function calculateIntervals(services) {
	var result = 0;
	var duration = 0;
	for (var i=0; i< services.length; i += 1) {
		duration += services[i].duration;
		result += services[i].duration / 30;
	}
	return result;
}