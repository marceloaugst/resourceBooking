import React from 'react';
import ReservationForm from '../components/ReservationForm';

function AddReservation() {
  return (
    <div className="add-reservation">
      <h2>Adicionar Nova Reserva</h2>
      <ReservationForm />
    </div>
  );
}

export default AddReservation;
