var express = require('express');
var path = require('path');
var fs = require('fs');
//var userUrlFile = require("./routes/userUrl.txt");

var routes = require('./routes/index');
var shortener = require('./routes/shortener');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/new', shortener);
app.get('/:encodedUrl', function(req, res){
  console.log("Trying to connect...");
  var encodedUrl = req.params.encodedUrl;
  fs.readFile('./userUrl.txt', (err, data) => {
    if (err) throw err;
    console.log(data.toString());
    var arr = data.toString().split(' ');
    if(encodedUrl == parseInt(arr[0])){
      //redirect to original website
      res.redirect(arr[1]);
    }else{
      res.end("Invalid short url!");
    }
  });
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var server = app.listen(process.env.PORT, function(){
  console.log("Listening on port __", process.env.PORT);
})