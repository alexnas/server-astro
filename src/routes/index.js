const Router = require('express');
const router = new Router();
const personRouter = require('./personRouter');
const zodiacRouter = require('./zodiacRouter');

router.use('/person', personRouter);
router.use('/zodiac', zodiacRouter);

module.exports = router;
