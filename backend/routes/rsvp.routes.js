const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST: Guardar confirmación
router.post('/confirmacion', async (req, res) => {
  try {
    const { nombre, asistencia, invitados } = req.body;

    const result = await pool.query(
      `INSERT INTO confirmaciones (nombre, asistencia, invitados, fecha_confirmacion)
       VALUES ($1, $2, $3, NOW()) RETURNING *`,
      [nombre, asistencia, invitados]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al confirmar asistencia');
  }
});

// GET: Obtener todas las confirmaciones
router.get('/confirmaciones', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM confirmaciones ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

module.exports = router;
