const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const userRoutes = require('./userRoutes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/users', userRoutes);

module.exports = router;