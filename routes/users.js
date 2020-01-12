const router = require('express').Router();
const { getAllUsers, getUser, createUser } = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/', getUser);
router.post('/', createUser);

module.exports = router;
