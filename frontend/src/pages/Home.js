import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReservationList from '../components/ReservationList';
import './styles/Home.css';

function Home() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = () => {
    axios
      .get('http://localhost:3001/reservations')
      .then((response) => setReservations(response.data))
      .catch((error) => console.error('Erro ao carregar reservas:', error));
  };

  const cancelReservation = (id) => {
    axios
      .delete(`http://localhost:3001/reservations/${id}`)
      .then(() => {
        // Atualiza a lista após a remoção
        setReservations((prevReservations) =>
          prevReservations.filter((res) => res.id !== id)
        );
        alert('Reserva cancelada com sucesso!');
      })
      .catch((error) => console.error('Erro ao cancelar reserva:', error));
  };

  return (
    <div className="home">
      <h2>Reservas Atuais</h2>
      <ReservationList reservations={reservations} onCancel={cancelReservation} />
    </div>
  );
}

export default Home;
