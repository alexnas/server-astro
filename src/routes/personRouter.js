const Router = require('express');
const router = new Router();
const personController = require('../controllers/personController');

router.post('/', personController.create);
router.get('/', personController.getAll);
router.get('/:id', personController.getOne);
router.put('/:id', personController.update);
router.delete('/:id', personController.delete);

module.exports = router;
