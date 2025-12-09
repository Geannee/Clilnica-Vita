const express = require('express');
const path = require('path');
const api = require('./api');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// CARREGA AS ROTAS DA API
app.use('/api', api);

module.exports = app;
