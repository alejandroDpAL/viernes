import express from 'express';
import cors from 'cors';
import pool from './conexion.db.js';

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Start server
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});

// Register endpoint
app.post('/registrar', async (req, res) => {
    const { nombre} = req.body;

    if (!nombre) {
        return res.status(400).json({ error: 'nombre es obligatorio' });
    }

    try {
        const sql = 'INSERT INTO usuario (nombre) VALUES (?)';
        const [result] = await pool.execute(sql, [nombre]);

        res.status(201).json({ message: 'se registro el usuario correctamente' });
    } catch (err) {
        console.error('Error al coonectar con la basedata:', err);
        res.status(500).json({ error: 'error del servidor ' });
    }
});


