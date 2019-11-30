var request = require('request');

request({
    uri: 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=o+que+fazer+em+brasilia&key=AIzaSyA8wcwzZA2_fpY2Zi0vnNDz2B5W79H-7cI',
    method: 'GET',
  }, function(erro, response, body){
    console.log(body);
   // console.log(body.html_attributions);

request({
    uri: 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + 'ChIJ1SZCvy0kMgsRQfBOHAlLuCo' + '&key=AIzaSyA8wcwzZA2_fpY2Zi0vnNDz2B5W79H-7cI',
    method: 'GET',
  }, function(erro, response, body){
  //console.log('response ', body);
    
  });
  });

/*
var GooglePlaces = require('google-places');
 
var places = new GooglePlaces('AIzaSyA8wcwzZA2_fpY2Zi0vnNDz2B5W79H-7cI');
 
places.search({keyword: 'P'}, function(err, response) {
  console.log("search: ", response);
 
  /*places.details({reference: response.results[0].reference}, function(err, response) {
    console.log("search details: ", response.result.website);
    // search details:  http://www.vermonster.com/ 
  });*/

/*places.autocomplete({input: 'Verm', types: "(cities)"}, function(err, response) {
  console.log("autocomplete: ", response.predictions);
 
  var success = function(err, response) {
    console.log("did you mean: ", response.result.name);
    // did you mean:  Vermont 
    // did you mean:  Vermont South 
    // did you mean:  Vermilion 
    // did you mean:  Vermillion 
  };
 
  for(var index in response.predictions) {
    places.details({reference: response.predictions[index].reference}, success);
  }
});*/