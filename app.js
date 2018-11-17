var express = require('express'),
  path = require('path'),
  app = express();
 
//set the port
app.set('port', 3003);
 
//tell express that we want to use the www folder
//for our static assets
app.use(express.static( 'dist/'));
 
// Listen for requests
var server = app.listen(app.get('port'), function () {
  console.log('The server is running on http://localhost:' + app.get('port'));
});