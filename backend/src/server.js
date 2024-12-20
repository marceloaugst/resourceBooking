const express = require('express');
const cors = require('cors');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Usar as rotas de reservas
app.use('/reservations', reservationRoutes);

// Iniciar o servidor
app.listen(3001, () => {
    console.log('Servidor rodando em http://localhost:3001');
});
