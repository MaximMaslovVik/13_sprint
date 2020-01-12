const router = require('express').Router();
const fs = require('fs');

router.get('/users', (req, res) => {
  fs.readFile('data/users.json', 'utf8', (error, data) => {
    if (error != null) {
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    }
    const json = JSON.parse(data);
    return res.send({ data: json });
  });
});

router.get('/users/:id', (req, res) => {
  const idUser = req.params.id;
  fs.readFile('data/users.json', 'utf8', (error, data) => {
    if (error != null) {
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    }
    const userId = JSON.parse(data).find((us) => us._id === idUser);
    if (!userId) {
      return res.status(404).send({ message: 'Такого пользователя нет' });
    }
    return res.send({ data: userId });
  });
});

module.exports = router;
