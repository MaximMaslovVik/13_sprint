const router = require('express').Router();
const { cardsAll, cardCreate, cardDelete } = require('../controllers/cards');

router.get('/cards', cardsAll);
router.post('/cards', cardCreate);
router.delete('/cards/:cardId', cardDelete);

module.exports = router;
