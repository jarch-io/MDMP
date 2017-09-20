var express = require('express');
var router = express.Router();
var birthdays = require('../controllers/birthdaysController');

/* GET users listing. */
router.get('/', birthdays.get);

module.exports = router;
