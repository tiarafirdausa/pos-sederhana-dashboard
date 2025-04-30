const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/db');
const { validationResult } = require('express-validator');
require('dotenv').config();

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.execute(
            'SELECT id, username, password, role FROM user WHERE username = ?',
            [username]
        );

        const user = rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Login gagal! Username atau password salah.' }); // Pastikan .json() digunakan
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Login gagal! Username atau password salah.' }); // Pastikan .json() digunakan
        }

        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign(
            { userId: user.id, username: user.username, role: user.role },
            jwtSecret,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: `Login ${user.role} berhasil!`, token: token, role: user.role }); // Pastikan .json() digunakan

    } catch (error) {
        console.error('Error saat login:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server.' }); // Pastikan .json() digunakan
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
    const token = req.logoutToken; 
  
    if (!token) {
      return res.status(400).json({ message: 'Token tidak ditemukan.' });
    }
  
    try {
      await db.execute('INSERT INTO blacklisted_tokens (token) VALUES (?)', [token]);
      res.status(200).json({ message: 'Logout berhasil.' });
    } catch (error) {
      console.error('Error saat logout:', error);
      res.status(500).json({ message: 'Terjadi kesalahan server saat logout.' });
    }
  };