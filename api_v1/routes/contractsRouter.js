var express = require('express');
var router = express.Router();
var contracts = require('../controllers/ContractsController');

/* GET users listing. */
router.get('/', contracts.get);

module.exports = router;
