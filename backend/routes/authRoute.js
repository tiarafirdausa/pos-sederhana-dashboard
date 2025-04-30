const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegistration } = require('../middleware/authValidation');

router.post('/login', authController.login);
router.post('/register', validateRegistration, authController.registerCashier);

module.exports = router;