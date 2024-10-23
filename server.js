require('dotenv').config();
const express = require('express');
const app = express();
const { sequelize } = require('./src/models');

// Importar rutas
const peliculaRoutes = require('./src/routes/peliculaRoutes');
const directorRoutes = require('./src/routes/directorRoutes');
const generoRoutes = require('./src/routes/generoRoutes');
const actorRoutes = require('./src/routes/actorRoutes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar rutas
app.use('/api/peliculas', peliculaRoutes);
app.use('/api/directores', directorRoutes);
app.use('/api/generos', generoRoutes);
app.use('/api/actores', actorRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API del Video Club' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Puerto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}).catch(err => {
  console.error('No se pudo conectar a la base de datos:', err);
});
