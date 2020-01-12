const express = require('express');
const path = require('path');
const users = require('./routes/users.js');
const cards = require('./routes/cards.js');

const app = express();
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/', users);
app.use('/', cards);

app.all('/*', (req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));
const { PORT = 3000 } = process.env;
app.listen(PORT, () => {});
