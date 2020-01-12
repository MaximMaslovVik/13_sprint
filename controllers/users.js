const User = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(404).send({ message: 'Произошла ошибка, неудалось создать пользователя' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((id) => {
      if (!id) {
        res.status(404).send({ message: 'Такого пользователя нет' });
      } else {
        res.send({ id });
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
