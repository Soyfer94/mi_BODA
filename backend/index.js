// backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Rutas
const rsvpRoutes = require('./routes/rsvp.routes');
const cancionRoutes = require('./routes/cancion.routes');


app.use('/api', rsvpRoutes);
app.use('/api/canciones', cancionRoutes);


// Ruta raíz (opcional)
app.get('/', (req, res) => {
  res.send('¡Servidor backend corriendo correctamente!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
