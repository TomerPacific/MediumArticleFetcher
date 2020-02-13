var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const rp = require('request-promise');
var port = process.env.PORT || 3000;
var app = express();

const url = "https://medium.com/@tomerpacific/latest?format=json";

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

app.use(cors({
  credentials: true,
  origin: 'https://tomerpacific.github.io'
}));

app.get('/medium', function (req, res) {
      rp(url)
    .then(function(mediumArticles){
      res.status(200).json({ message: mediumArticles});
    })
    .catch(function(err){
      console.log(err);
    });
});



app.listen(port, function () {
 console.log('Example app listening on port ' + port);
});