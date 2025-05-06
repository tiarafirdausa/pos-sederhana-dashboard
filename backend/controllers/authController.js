const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const { validationResult } = require('express-validator');
require('dotenv').config();

const cookieOptions = {
    httpOnly: true,
    maxAge: 60 * 60 * 1000, // 1 jam
    secure: process.env.NODE_ENV === 'production', // hanya https di production
    sameSite: 'strict',
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.execute(
            'SELECT id, username, password, role FROM user WHERE username = ?',
            [username]
        );

        const user = rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Login gagal! Username atau password salah.' });
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Login gagal! Username atau password salah.' });
        }

        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign(
            { userId: user.id, username: user.username, role: user.role },
            jwtSecret,
            { expiresIn: '1h' }
        );

        // Set cookie
        res.cookie('authcookie', token, cookieOptions);
        res.status(200).json({ message: `Login ${user.role} berhasil!`, role: user.role });
    } catch (error) {
        console.error('Error saat login:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
};


exports.registerCashier = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, email, password } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const [result] = await db.execute(
            'INSERT INTO user (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, 'cashier']
        );

        res.status(201).send({ message: 'Registrasi kasir berhasil!', userId: result.insertId });

    } catch (error) {
        console.error('Error saat registrasi kasir:', error);
        res.status(500).send({ message: 'Terjadi kesalahan server.' });
    }
};

exports.logout = async (req, res) => {
    const token = req.cookies['authcookie'];

    if (!token) {
        return res.status(400).json({ message: 'Token tidak ditemukan.' });
    }

    try {
        // Simpan token ke tabel blacklist jika pakai sistem blacklist
        await db.execute('INSERT INTO blacklisted_tokens (token) VALUES (?)', [token]);

        // Hapus cookie
        res.clearCookie('authcookie');

        res.status(200).json({ message: 'Logout berhasil.' });
    } catch (error) {
        console.error('Error saat logout:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat logout.' });
    }
};

// update user profile
exports.updateProfile = async (req, res) => {
    const { username, email, status } = req.body;
    const userId = req.user.userId; 
  
    try {
      const [result] = await db.execute(
        'UPDATE user SET username = ?, email = ?, status = ? WHERE id = ?',
        [username, email, status, userId]
      );
  
      if (result.affectedRows === 0) {
        return res.status(400).json({ message: 'Gagal memperbarui profil.' });
      }
  
      const [updatedUser] = await db.execute('SELECT * FROM user WHERE id = ?', [userId]);
      res.status(200).json(updatedUser[0]);
    } catch (error) {
      console.error('Error saat memperbarui profil:', error);
      res.status(500).json({ message: 'Terjadi kesalahan server.' });
    }
  };


// get current user profile
exports.getCurrentUser = async (req, res) => {
    const { userId } = req.user;
    try {
      const [rows] = await db.execute(
        "SELECT id, picture, username, email, role, status FROM user WHERE id = ?",
        [userId]
      );
  
      if (rows.length === 0) {
        return res.status(404).json({ message: "User tidak ditemukan." });
      }
  
      res.status(200).json(rows[0]); 
    } catch (err) {
      res.status(500).json({ message: "Gagal mengambil profil." });
    }
  };
  