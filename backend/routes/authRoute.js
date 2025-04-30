const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegistration } = require('../middleware/authValidation');
const logoutMiddleware = require('../middleware/logoutMiddleware');

router.post('/login', authController.login);
router.post('/register', validateRegistration, authController.registerCashier);
router.post('/logout', logoutMiddleware, authController.logout);

module.exports = router;