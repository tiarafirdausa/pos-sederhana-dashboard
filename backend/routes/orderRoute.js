// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController')

router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/:category', orderController.getOrderStatCategory
);



module.exports = router;