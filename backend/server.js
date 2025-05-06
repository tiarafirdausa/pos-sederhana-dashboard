const express = require('express');
const cors = require('cors');
const db = require('./models/db');
const menuRoutes = require('./routes/menuRoute');
const authRoutes = require('./routes/authRoute');
const orderRoutes = require('./routes/orderRoute'); 
const cookieParser = require('cookie-parser');

const port = 5000;
const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Route
app.use('/menu', menuRoutes);
app.use('/auth', authRoutes); 
app.use('/orders', orderRoutes);
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
