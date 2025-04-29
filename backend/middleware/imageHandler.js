const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Konfigurasi penyimpanan gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads')); 
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const filename = Date.now() + fileExtension;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'), false);
    }
  }
});

// Middleware untuk menangani gambar saat update menu
const handleImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, category, price, description } = req.body;

    // Mengambil data menu yang ada di database
    const [existingMenu] = await db.query('SELECT * FROM menu WHERE id = ?', [id]);
    if (!existingMenu.length) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    // Jika ada gambar baru yang diupload, simpan gambar baru
    if (req.file) {
      const oldImagePath = existingMenu[0].image;
      if (oldImagePath && fs.existsSync(path.join(__dirname, '..', oldImagePath))) {
        // Hapus gambar lama jika ada
        fs.unlinkSync(path.join(__dirname, '..', oldImagePath));
      }

      req.body.image = `uploads/${req.file.filename}`;
    } else {
      // Jika tidak ada gambar baru, gunakan gambar lama
      req.body.image = existingMenu[0].image;
    }

    next(); // Panggil middleware berikutnya (controller untuk update menu)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to handle image' });
  }
};

// Ekspor middleware
module.exports = { upload, handleImage };
