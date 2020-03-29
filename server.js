const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');

const app = express();

app.use(express.static(__dirname + '/dist/test-tecso-frontend'));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/test-tecso-frontend/index.html'));
});
var proxy = httpProxy.createProxyServer({});
app.all("*/api/*", function (req, res) {
  console.log("old request url " + req.url)
  //req.url = '/' + req.url.split('/').slice(2).join('/'); // remove the '/api' part
  console.log("new request url " + req.url)
  proxy.web(req, res, {
    host: "https://sb-tecso-examen.herokuapp.com/api",
    port: 80
  });
});
