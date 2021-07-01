import { Request, Response, NextFunction } from 'express';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const feed = require('rss-to-json');
const port = process.env.PORT || 3000;
const app = express();

const baseURL = "https://medium.com/feed/@";


app.use(bodyParser.json());

app.use(function(req: Request, res: Response, next: NextFunction) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  return next();
});

app.use(cors({
  credentials: true,
  origin: 'https://tomerpacific.github.io'
}));

app.get('/medium/*', function (req: Request, res: Response) {
        
        if (!req.url) {
          return res.status(404).send({'message': 'No username received'});
        }
        
        let lastSlashIndex = req.url.lastIndexOf('/');
        let url = baseURL + req.url.substring(lastSlashIndex+1);
        try {
          feed.load(url, function(error: Error, rss: Object) {
            if (!error) {
              return res.status(200).send({'message': rss});
            } else {
              return res.status(404).send({"message": error});
            }
          });
        } catch(exception) {
          console.error("Exception in request " + JSON.stringify(exception));
        }
        
  });


app.listen(port, function () {
 console.log('MediumArticleFetcher listening on port ' + port);
});
