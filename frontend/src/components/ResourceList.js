import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReservationForm from './ReservationForm';
import ReservationList from './ReservationList';
import SearchForm from './SearchForm';
import './styles/ResourceList.css';

function ResourceList() {
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

  const searchReservations = (criteria) => {
    const params = new URLSearchParams(criteria).toString(); // Converte os parâmetros para a URL
    axios
      .get(`http://localhost:3001/reservations/search?${params}`) // Envia a requisição de busca
      .then((response) => setReservations(response.data)) // Atualiza o estado com os resultados da busca
      .catch((error) => console.error('Erro ao buscar reservas:', error));
  };

  const addReservation = (reservation) => {
    axios
      .post('http://localhost:3001/reservations', reservation)
      .then(() => loadReservations())
      .catch((error) => alert(error.response.data.message));
  };

  const deleteReservation = (id) => {
    axios
      .delete(`http://localhost:3001/reservations/${id}`)
      .then(() => loadReservations())
      .catch((error) => console.error('Erro ao excluir reserva:', error));
  };

  return (
    <div className="resource-list-container">

      {/* Seção combinada de busca e adição */}
      <div className="combined-section">
        <div className="subsection">
          <h2>Adicionar Nova Reserva</h2>
          <ReservationForm onAdd={addReservation} />
        </div>

        <div className="subsection">
          <h2>Buscar Reservas</h2>
          <SearchForm onSearch={searchReservations} />
        </div>
      </div>

      {/* Reservas atuais */}
      <div className="section">
        <h2>Reservas Atuais</h2>
        <ReservationList reservations={reservations} onDelete={deleteReservation} />
      </div>
    </div>
  );
}

export default ResourceList;
