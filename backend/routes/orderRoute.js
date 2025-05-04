// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController')

router.post('/orders', orderController.createOrder);
module.exports = router;