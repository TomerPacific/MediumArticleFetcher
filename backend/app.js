var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var feed = require('rss-to-json');
var port = process.env.PORT || 3000;
var app = express();

let url = "https://medium.com/feed/@";


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

///medium/tomerpacific
app.get('/medium/*', function (req, res) {
        
        if (!req.url) {
          res.status(404).send({'message': 'No username received'});
        }
        
        let lastSlashIndex = req.url.lastIndexOf('/');
        url += req.url.substring(lastSlashIndex+1);
        feed.load(url, function(error, rss) {
          if (!error) {
            res.status(200).send({'message': rss});
          }
        });
  });


app.listen(port, function () {
 console.log('Example app listening on port ' + port);
});
