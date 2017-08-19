// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var rest = require('restler');
var apiai = require('apiai');
var session = require('express-session')

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))



var apiai = apiai("ca6e754be1274b94822b83a4412144c4");

var router = express.Router();

router.get('/', function(req, res) {
  console.log(req.originalUrl);
  var textOutput = req.originalUrl.replace('/api/text/', '');
  textOutput = decodeURI(textOutput);
  console.log(textOutput);

  var request = apiai.textRequest(textOutput, {
      sessionId: req.session.id
  });


  request.on('response', function(response) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
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
  res.header("Pragma", "*")
  res.header("If-Modified-Since", "*") 
  next();
});
app.use('/api/text/*', router);
// START THE SERVER
// =============================================================================
app.listen(8080);
console.log('Magic happens on port 8080');
