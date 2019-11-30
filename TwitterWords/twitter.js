var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'byqziBOv1NTqLHljBPgX2Z4xl',
  consumer_secret: 'cpdmImcFRrWBHZIhTkNLWJ0WdA0TmoQHrtdUJ45iyybOaQ76XM',
  access_token_key: '953973670917103617-Rf6X9mwrKx81LGpjUE7EYvVwsiMyt5G',
  access_token_secret: 'uZ7d17mOJ1iTGjuMvGJAasncn0sAtP8zSZLvktwWrH2Pa'
});

client.stream('statuses/filter', {track: 'Bolsonaro'}, function(stream) {
  stream.on('data', function(event) {
    console.log(event.text);
    console.log();
  });
 
  stream.on('error', function(error) {
    throw error;
  });
});