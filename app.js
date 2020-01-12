const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const { PORT = 3000 } = process.env;
const users = require('./routes/users');
const cards = require('./routes/cards');
const error = require('./routes/app');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '5e1a5d8c54b45b1d543115ad',
  };
  next();
});

app.use('/', users);
app.use('/', cards);
app.use('/', error);
app.listen(PORT, () => {});
