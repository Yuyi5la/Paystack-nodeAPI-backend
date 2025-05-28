const express = require('express');
const router = express.Router();
const { initiatePayment, getPaymentStatus } = require('../controllers/paymentController');

router.post('/', initiatePayment);
router.get('/:id', getPaymentStatus);

module.exports = router;


