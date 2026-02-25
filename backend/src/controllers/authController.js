import { pool } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const userExist = await pool.query('SELECT * FROM users WHERE username = $1', [username])
        if (userExist.rows.length > 0) {
            return res.status(400).json({
                "success": false,
                "message": "Username sudah dipakai, cari yang lain!",
                "errors": null
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username', [username, hashedPassword]);
        res.status(201).json({
            "success": true,
            "message": "User berhasil dibuat!",
            "data": { user: newUser.rows[0] }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Sistem kami sedang istirahat sebentar, coba lagi nanti ya!" });
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const findUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (findUser.rows.length === 0) {
            return res.status(400).json({
                "success": false,
                "message": "Username tidak ditemukan!",
                "errors": null
            });
        }

        const user = findUser.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                "success": false,
                "message": "Password salah!",
                "errors": null
            });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            "success": true,
            "message": "Login Berhasil!",
            "data": { token: token }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Sistem kami sedang istirahat sebentar, coba lagi nanti ya!" });
    }
}