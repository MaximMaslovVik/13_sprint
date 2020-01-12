const router = require('express').Router();
const { cardsAll, cardCreate, cardDelete } = require('../controllers/cards');

router.get('/', cardsAll);
router.post('/', cardCreate);
router.delete('/:cardId', cardDelete);

module.exports = router;
