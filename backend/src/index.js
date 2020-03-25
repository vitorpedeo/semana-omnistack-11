const express = require('express');
const app = express();
//Pacote de segurança
const cors = require('cors');
const routes = require('./routes');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

app.listen(3333);