var express = require('express');
var router = express.Router();
var fs = require("fs");
/* GET users listing. */
router.get('/:userUrl*', function(req, res, next) {
	var original_url = req.url.slice(1);
	console.log(original_url);
	var short_url  = null;
	var resObj = null;

	if(original_url.split('.').length >= 2){
		var high = 9999;
		var low = 1111;		
		short_url = Math.round(Math.random() * (high - low) + low);
		
	}
	
	if(short_url){
		var arr = original_url.split('/');
		if(arr.length == 1)
			original_url = "http://" + original_url;
		resObj = {"original_url": original_url, "short_url": short_url};
		fs.writeFile('./userUrl.txt', short_url +" "+ original_url , "utf8", (err) => {
		  if (err) throw err;
		  console.log('It\'s saved!');
		});
		res.send(resObj);
	}
	else{
		resObj = {"error":"invalid url"};
		res.send(resObj);
	}
  
});

module.exports = router;



// And then, to read it...
