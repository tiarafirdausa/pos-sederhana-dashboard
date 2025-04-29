const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// Endpoint CRUD
router.get('/', menuController.getAllMenus);       // GET semua menu
router.post('/', menuController.createMenu);       // POST tambah menu
router.put('/:id', menuController.updateMenu);     // PUT update menu by id
router.delete('/:id', menuController.deleteMenu);  // DELETE menu by id

module.exports = router;
