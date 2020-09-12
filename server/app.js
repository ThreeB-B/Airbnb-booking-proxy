require('newrelic');
const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const { routes } = require('./config.json');

const app = express();
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(cors());

app.get('/loaderio*', (req, res) => {
  fs.readFile(`${__dirname}/../loaderio.txt`, (err, result) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(result);
    }
  });
});


for (let route of routes) {
  app.use(route.route,
    proxy({
      target: route.address,
    })
  );
}


app.listen(5000, () => {
  console.log('Proxy listening on port 5000');
});
