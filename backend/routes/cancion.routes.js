const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST: Guardar sugerencia de canción
router.post('/', async (req, res) => {
  try {
    const { cancion } = req.body;

    const result = await pool.query(
      `INSERT INTO canciones (cancion)
       VALUES ($1) RETURNING *`,
      [cancion]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al guardar la cancion');
  }
});

// GET: Ver sugerencias (opcional)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM canciones ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener cancion');
  }
});

module.exports = router;
