import { pool } from '../db.js';

export const getTodo = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await pool.query('SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC', [userId]);

        res.status(200).json({
            success: true,
            data: result.rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Gagal mengambil data tugas." });
    }
}

export const createTodo = async (req, res) => {
    const { task } = req.body;
    const userId = req.user.id;

    try {
        const result = await pool.query('INSERT INTO todos (user_id, task) VALUES ($1, $2) RETURNING *', [userId, task]);
        res.status(201).json({
            success: true, 
            message: "Tugas berhasil ditambahkan!",
            data: result.rows[0]
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Gagal menambahkan tugas." });
    }
}

export const toggleTodo = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const result = await pool.query('UPDATE todos SET is_completed = NOT is_completed WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Tugas tidak ditemukan.",
                errors: null
            });
        }

        res.status(200).json({
            success: true,
            message: "Status tugas berhasil diperbarui!",
            data: result.rows[0]
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Gagal memperbarui status." });
    }
}

export const editTodo = async (req, res) => {
    const { id } = req.params;
    const { task } = req.body;
    const userId = req.user.id;

    try {
        const result = await pool.query('UPDATE todos SET task = $1 WHERE id = $2 AND user_id = $3 RETURNING *', [task, id, userId]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Tugas tidak ditemukan.",
                errors: null
            });
        }

        res.status(200).json({
            success: true,
            message: "Tugas berhasil diperbarui!",
            data: result.rows[0]
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Gagal memperbarui tugas." });
    }
}

export const deleteTodo = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const result = await pool.query('DELETE FROM todos WHERE id = $1 AND user_id = $2', [id, userId]);
        if (result.rowCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Tugas tidak ditemukan.",
                errors: null
            });
        }
        res.status(200).json({
            success: true,
            message: "Tugas berhasil dihapus!",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Gagal menghapus tugas." });
    }
}