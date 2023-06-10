const Router = require('express');
const router = new Router();
const zodiacController = require('../controllers/zodiacController');

router.post('/', zodiacController.create);
router.get('/', zodiacController.getAll);
router.get('/:id', zodiacController.getOne);
router.get('/person/:id', zodiacController.getOneByPersonId);
router.put('/:id', zodiacController.update);
router.delete('/:id', zodiacController.delete);

module.exports = router;
