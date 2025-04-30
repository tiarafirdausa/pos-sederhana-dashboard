const { body } = require('express-validator');
const db = require('../models/db');

exports.validateRegistration = [
    body('username')
        .notEmpty()
        .withMessage('Username harus diisi.')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('Username harus memiliki panjang antara 3 hingga 50 karakter.')
        .custom(async (value) => {
            const [existingUser] = await db.execute(
                'SELECT * FROM user WHERE username = ?',
                [value]
            );
            if (existingUser.length > 0) {
                throw new Error('Username sudah terdaftar.');
            }
            return true;
        }),
    body('email')
        .notEmpty()
        .withMessage('Email harus diisi.')
        .trim()
        .isEmail()
        .withMessage('Format email tidak valid.')
        .custom(async (value) => {
            const [existingUser] = await db.execute(
                'SELECT * FROM user WHERE email = ?',
                [value]
            );
            if (existingUser.length > 0) {
                throw new Error('Email sudah terdaftar.');
            }
            return true;
        }),
    body('password')
        .notEmpty()
        .withMessage('Password harus diisi.')
        .isLength({ min: 6 })
        .withMessage('Password harus memiliki panjang minimal 6 karakter.'),
    body('confirmPassword')
        .notEmpty()
        .withMessage('Konfirmasi password harus diisi.')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Konfirmasi password tidak cocok.');
            }
            return true;
        }),
];