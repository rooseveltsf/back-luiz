const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
require('./database');

const app = express();

app.use(express.json());
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  '/avatar',
  express.static(path.resolve(__dirname, '..', 'uploads'))
);
app.use(cors());

app.use(routes);

app.listen(3333);
