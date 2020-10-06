const express = require('express');

let app = express();

//Set up serving FE
app.use(express.static(__dirname + '/../client/dist'));

app.use(function(req, res, next){
	res.set({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': '*'
	})
	next();
});

let port = 8000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});