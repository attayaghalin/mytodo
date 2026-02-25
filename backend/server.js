import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

import authRoutes from './src/routes/authRoutes.js';
import todoRoutes from './src/routes/todoRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}`);
})

