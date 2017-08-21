// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var rest = require('restler');
var apiai = require('apiai');
var session = require('express-session')
var cors = require('cors')

app.options('*', cors()) // include before other routes

//app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))



var apiai = apiai("ca6e754be1274b94822b83a4412144c4");

var router = express.Router();

var getQueryString = function (field, url) {
	var href = url;
	var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
	var string = reg.exec(href);
	return string ? string[1] : null;
};

router.get('/', function(req, res) {

  console.log(req.baseUrl);
  var textOutput = req.baseUrl.replace('/api/text/', '');
  textOutput = decodeURI(textOutput);
  console.log(req.session.id);

  var request = apiai.textRequest(textOutput, {
      sessionId: req.query.sessionID
  });
  request.on('response', function(response) {
    //  console.log(response);
    res.json(response);
  });

  request.on('error', function(error) {
    res.json(error);
  });

  request.end();
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/api/text/*', router);
// START THE SERVER
// =============================================================================
app.listen(8080);
console.log('Magic happens on port 8080');
