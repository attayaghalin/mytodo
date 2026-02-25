import express from 'express';
const router = express.Router();
import { getTodo, createTodo, toggleTodo, editTodo, deleteTodo } from '../controllers/todoController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

router.get('/', authenticateToken, getTodo);
router.post('/', authenticateToken, createTodo);
router.patch('/toggle/:id', authenticateToken, toggleTodo);
router.patch('/edit/:id', authenticateToken, editTodo);
router.delete('/:id', authenticateToken, deleteTodo);

export default router;