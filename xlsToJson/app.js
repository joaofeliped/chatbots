var mongoXlsx = require('mongo-xlsx');

mongoXlsx.xlsx2MongoData("./projetoTRIP.xlsx", null, function(err, mongoData) {
  //console.log('Mongo data:', mongoData); 

  mongoData.forEach(function(cidade){
    var dadoFinal = {};

    dadoFinal.cidade = cidade.cidade;
    dadoFinal.pais = cidade.pais;
    dadoFinal.filhos_pequenos = cidade.filhos_pequenos;
    dadoFinal.filhos_adolescentes = cidade.filhos_adolescentes;
    dadoFinal.casal = cidade.casal;
    dadoFinal.amigos = cidade.amigos;
    dadoFinal.sozinho = cidade.sozinho;

    if(cidade.quando_ir === 'todo ano') {
      dadoFinal.quando_ir = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    } else {
      dadoFinal.quando_ir = cidade.quando_ir.split(',');
    }

    var atividades = [];

    if(cidade.praia) {
      atividades.push('Praia');
    }

    if(cidade.resort) {
      atividades.push('Resort');
    }

    if(cidade.esportes_aquaticos) {
      atividades.push('Esportes Aquáticos');
    }

    if(cidade.esportes_de_inverno) {
      atividades.push('Esportes de Inverno');
    }

    if(cidade.gastronomia) {
      atividades.push('Gastronomia');
    }

    if(cidade.cidade_historica) {
      atividades.push('Cidade Histórica');
    }

    if(cidade.vida_noturna) {
      atividades.push('Vida Noturna');
    }

    if(cidade.museus) {
      atividades.push('Museus');
    }

    if(cidade.enoturismo) {
      atividades.push('Enoturismo');
    }

    if(cidade.natureza) {
      atividades.push('Natureza');
    }

    if(cidade.aventura) {
      atividades.push('Aventura');
    }

    if(cidade.parques_de_diversao) {
      atividades.push('Parques de Diversão');
    }

    if(cidade.roadtrip) {
      atividades.push('Roadtrip');
    }

    if(cidade.vilas) {
      atividades.push('Vilas');
    }

    if(atividades.length > 0) {
      dadoFinal.atividades = atividades;
    }
    
    dadoFinal.resumo = cidade.resumo;

    console.log(dadoFinal);
  });
});