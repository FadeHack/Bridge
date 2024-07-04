const express = require('express');
const { getTransactionParams } = require('../controllers/transactionController');
const router = express.Router();

router.get('/', getTransactionParams);

module.exports = router;
