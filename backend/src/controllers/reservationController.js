const { reservations, Reservation, hasConflict } = require('../models/reservation');
const { filterReservationsByQuery } = require('../utils/dateUtils');

// Controlador para listar todas as reservas
const getAllReservations = (req, res) => {
    res.json(reservations);
};

// Controlador para criar nova reserva
const createReservation = (req, res) => {
    const { resource, user, start_time, end_time } = req.body;

    if (!resource || !user || !start_time || !end_time) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const newReservation = new Reservation(resource, user, start_time, end_time);

    if (hasConflict(newReservation)) {
        return res.status(400).json({ message: 'Conflito de horário para o recurso especificado.' });
    }

    reservations.push(newReservation);
    res.status(201).json(newReservation);
};

// Controlador para cancelar reserva
const deleteReservation = (req, res) => {
    const { id } = req.params;
    const index = reservations.findIndex((reservation) => reservation.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Reserva não encontrada.' });
    }

    reservations.splice(index, 1);
    res.status(204).send();
};

// Controlador para buscar reservas por recurso e data
const searchReservations = (req, res) => {
    const filteredReservations = filterReservationsByQuery(req.query, reservations);
    res.json(filteredReservations);
};

module.exports = { getAllReservations, createReservation, deleteReservation, searchReservations };
