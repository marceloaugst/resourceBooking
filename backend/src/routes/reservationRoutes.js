const express = require('express');
const router = express.Router();
const { getAllReservations, createReservation, deleteReservation, searchReservations } = require('../controllers/reservationController');

// Listar todas as reservas
router.get('/', getAllReservations);

// Criar uma nova reserva
router.post('/', createReservation);

// Cancelar uma reserva
router.delete('/:id', deleteReservation);

// Buscar reservas por recurso e data
router.get('/search', searchReservations);

module.exports = router;
