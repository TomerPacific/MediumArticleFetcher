const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const feed = require('rss-to-json');
const port = process.env.PORT || 3000;
const app = express();

const baseURL = "https://medium.com/feed/@";


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

app.get('/medium/*', function (req, res) {
        
        if (!req.url) {
          return res.status(404).send({'message': 'No username received'});
        }
        
        let lastSlashIndex = req.url.lastIndexOf('/');
        let url = baseURL + req.url.substring(lastSlashIndex+1);
        feed.load(url, function(error, rss) {
          if (!error) {
            return res.status(200).send({'message': rss});
          } else {
            return res.status(404).send({"message": error});
          }
        });
  });


app.listen(port, function () {
 console.log('MediumArticleFetcher listening on port ' + port);
});
