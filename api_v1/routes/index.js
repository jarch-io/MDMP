var express = require('express');
var router = express.Router();

router.use('/employees',require('./employeesRouter'));
router.use('/birthdays',require('./birthdaysRouter'));
router.use('/contracts',require('./contractsRouter'));

module.exports = router;
