const express = require('express');
const { getTransactionParams } = require('../controllers/transactionController');
const router = express.Router();

router.post('/', getTransactionParams);

module.exports = router;
