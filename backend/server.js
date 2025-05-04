const express = require('express');
const cors = require('cors');
const db = require('./models/db');
const menuRoutes = require('./routes/menuRoute');
const authRoutes = require('./routes/authRoute');
const orderRoutes = require('./routes/orderRoute'); 

const port = 5000;
const app = express();

app.use(cors());
app.use(express.json());

// Route
app.use('/menu', menuRoutes);
app.use('/auth', authRoutes); 
app.use('/', orderRoutes);
app.use('/uploads', express.static('uploads'));

// Cek koneksi database dan start server
async function startServer() {
  try {
    await db.query('SELECT 1');
    console.log('Database connected successfully!');

    app.listen(port, () => {
      console.log(`Server berjalan di http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
}

startServer();
