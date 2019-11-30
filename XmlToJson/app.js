var mongo = require('mongodb');
var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var i = 0;

fs.readFile(__dirname + '/LoteXMLNFe.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        
       	result.enviNFe.nfeProc.forEach(function(e){
       		
          e.NFe.forEach(function(f){
            
            var emit = f.infNFe[0].emit[0];
            var endEmit = emit.enderEmit[0];

            var det = f.infNFe[0].det;

            var detArr = [];

            det.forEach(function(d){
              var valorFinalComDesconto = null;

              if(d.prod[0].vDesc) {
                valorFinalComDesconto = Number(d.prod[0].vUnTrib[0]) - Number(d.prod[0].vDesc[0]);
              }

              var detTemp = {
                prod: {
                   cProd: d.prod[0].cProd[0],
                   cEAN: d.prod[0].cEAN[0],
                   xProd: d.prod[0].xProd[0],
                   NCM: d.prod[0].NCM[0],
                   CFOP: d.prod[0].CFOP[0],
                   uCom: d.prod[0].uCom[0],
                   qCom: d.prod[0].qCom[0],
                   vUnCom: d.prod[0].vUnCom[0],
                   vProd: d.prod[0].vProd[0],
                   cEANTrib: d.prod[0].cEANTrib[0],
                   uTrib: d.prod[0].uTrib[0],
                   qTrib: d.prod[0].qTrib[0],
                   vUnTrib: Number(d.prod[0].vUnTrib[0]),
                   indTot: d.prod[0].indTot[0],
                   vDesc: d.prod[0].vDesc ? Number(d.prod[0].vDesc[0]) : null,
                   valorFinalComDesconto: valorFinalComDesconto
                }
              }

              if(!detTemp.prod.valorFinalComDesconto) {
                delete detTemp.prod.valorFinalComDesconto;
              }

              if(!detTemp.prod.vDesc) {
                delete detTemp.prod.vDesc;
              }

               detArr.push(detTemp);

               
            });
            
            var dest = null;

               if(f.infNFe[0].dest) {
                var enderDest = null;

                if(f.infNFe[0].dest[0].enderDest) {
                  enderDest = {
                     xLgr: f.infNFe[0].dest[0].enderDest[0].xLgr[0],
                      nro: f.infNFe[0].dest[0].enderDest[0].nro[0],
                      xBairro: f.infNFe[0].dest[0].enderDest[0].xBairro[0],
                      cMun: f.infNFe[0].dest[0].enderDest[0].cMun[0],
                      xMun: f.infNFe[0].dest[0].enderDest[0].xMun[0],
                      UF: f.infNFe[0].dest[0].enderDest[0].UF[0],
                      CEP: f.infNFe[0].dest[0].enderDest[0].CEP ? f.infNFe[0].dest[0].enderDest[0].CEP[0] : null,
                      cPais: f.infNFe[0].dest[0].enderDest[0].cPais[0],
                      xPais: f.infNFe[0].dest[0].enderDest[0].xPais[0] 
                  }

                  if(!enderDest.CEP) {
                    delete enderDest.CEP;
                  }
                }

                dest = {
                  CPF: f.infNFe[0].dest[0].CPF[0],
                  xNome: f.infNFe[0].dest[0].xNome[0],
                  enderDest: enderDest,
                  indIEDest: f.infNFe[0].dest[0].indIEDest[0]
                }

                if(!dest.enderDest) {
                    delete dest.enderDest;
                  }
               }

               var nfe = {
                emit: {
                  CNPJ: emit.CNPJ[0],
                  xNome: emit.xNome[0],
                  xFant: emit.xFant[0],
                   enderEmit: {
                      xLgr : endEmit.xLgr[0],
                      nro : endEmit.nro[0],
                      xCpl : endEmit.xCpl ? endEmit.xCpl[0] : null,
                      xBairro : endEmit.xBairro[0],
                      cMun : endEmit.cMun[0],
                      xMun : endEmit.xMun[0],
                      UF : endEmit.UF[0],
                      CEP : endEmit.CEP[0],
                      cPais : endEmit.cPais[0],
                      xPais : endEmit.xPais[0]
                   },
                   IE: emit.IE[0],
                   IM: emit.IM ? emit.IM[0] : null,
                   CNAE: emit.CNAE ? emit.CNAE[0] : null,
                   CRT: emit.CRT[0]
                },

                det: detArr,
                dest: dest
              }

              if(!nfe.emit.enderEmit.xCpl) {
                delete nfe.emit.enderEmit.xCpl;
              }

              if(!nfe.emit.IM) {
                delete nfe.emit.IM;
              }

              if(!nfe.emit.CNAE) {
                delete nfe.emit.CNAE;
              }

              if(!nfe.dest) {
                delete nfe.dest;
              }

              inserir(nfe);

              i++;

              console.log('Done ', i);
       		});
       	});
        
    });
});

function connection() {
  return new mongo.Db('pet', new mongo.Server('localhost', 27017, {}), {});
}

function inserir(nfe) {
  connection().open(function(err1, mongoclient){
    mongoclient.collection('NFes', function(err2, collection){
      
      collection.insert(nfe);
      
      mongoclient.close();
    });
  });
}