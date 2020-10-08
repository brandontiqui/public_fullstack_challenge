const express = require('express');
const fs = require('fs');

let app = express();

// initialize farm data from file
const rawData = fs.readFileSync('farm_data.json');
const farmData = JSON.parse(rawData);

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

app.get('/farms', function(req, res) {
	// return farm data
	return res.send(farmData);
});
