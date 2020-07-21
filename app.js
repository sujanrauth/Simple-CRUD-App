const express = require('express');
const bodyParser = require('body-parser');
const log = require('morgan')
const db = require('./config/database');
const app = express();
const route = require('./api/routes/routes')
const authroute = require('./api/routes/authroute');

db();

app.use(log("dev"));
app.use(bodyParser.urlencoded(
    { extended : true }
));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
   next();
 });

app.use('/api',route);
app.use('/user',authroute);
// app.use('/getnumber',route);

module.exports = app;