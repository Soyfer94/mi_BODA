const express = require('express');
const router = express.Router();
const pool = require('../db');
const ExcelJS = require('exceljs');

// POST: Guardar confirmación
router.post('/confirmacion', async (req, res) => {
  try {
    const { nombre, dni, email, asistencia, comida } = req.body;

    const result = await pool.query(
      `INSERT INTO confirmaciones (nombre, dni, email, asistencia, comida)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nombre, dni, email, asistencia, comida]
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

router.get('/exportar-excel', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM confirmaciones ORDER BY id');

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Confirmaciones');

    // Definir columnas
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre', key: 'nombre', width: 30 },
      { header: 'DNI', key: 'dni', width: 15 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Asistencia', key: 'asistencia', width: 15 },
      { header: 'Comida', key: 'comida', width: 20 },
      { header: 'Fecha', key: 'fecha_confirmacion', width: 25 }
    ];

    // Agregar filas
    result.rows.forEach(row => {
      worksheet.addRow(row);
    });

    // Configurar cabeceras
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=confirmaciones.xlsx'
    );

    // Enviar el archivo
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al exportar a Excel');
  }
});