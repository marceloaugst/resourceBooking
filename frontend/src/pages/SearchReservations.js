import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import ReservationList from '../components/ReservationList';
import axios from 'axios';

function SearchReservations() {
  const [reservations, setReservations] = useState([]);

  const handleSearch = (criteria) => {
    const params = new URLSearchParams(criteria).toString();
    axios
      .get(`http://localhost:3001/reservations/search?${params}`)
      .then((response) => setReservations(response.data))
      .catch((error) => console.error('Erro ao buscar reservas:', error));
  };

  return (
    <div className="search-reservations">
      <h2>Buscar Reservas</h2>
      <SearchForm onSearch={handleSearch} />
      <ReservationList reservations={reservations} />
    </div>
  );
}

export default SearchReservations;
