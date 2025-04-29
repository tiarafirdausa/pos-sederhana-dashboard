const db = require('../models/db');
const { upload, handleImage } = require('../middleware/imageHandler');

// Get semua menu
exports.getAllMenus = async (req, res) => {
  try {
    const [menus] = await db.query('SELECT * FROM menu');
    res.json(menus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to get menus' });
  }
};
  
// Tambah menu baru
exports.createMenu = [
    upload.single('image'),
    async (req, res) => {
      try {
        const { name, category, price, description } = req.body;
        const image = req.file ? `uploads/${req.file.filename}` : null;
  
        await db.query(
          'INSERT INTO menu (image, name, category, price, description) VALUES (?, ?, ?, ?, ?)',
          [image, name, category, price, description]
        );
  
        res.status(201).json({ message: 'Menu created successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create menu' });
      }
    }
  ];

// Update menu
exports.updateMenu = [
    upload.single('image'),  
    handleImage,             
    async (req, res) => {
      try {
        const { id } = req.params;
        const { name, category, price, description, image } = req.body;
  
        await db.query(
          'UPDATE menu SET image = ?, name = ?, category = ?, price = ?, description = ? WHERE id = ?',
          [image, name, category, price, description, id]
        );
  
        res.json({ message: 'Menu updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update menu' });
      }
    }
  ];

// Hapus menu
exports.deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM menu WHERE id = ?', [id]);
    res.json({ message: 'Menu deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete menu' });
  }
};
