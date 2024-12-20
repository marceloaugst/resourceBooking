import React, { useState } from 'react';
import axios from 'axios';
import './styles/SearchReservation.css';

const SearchReservation = () => {
  const [resource, setResource] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState([]); // Armazenar reservas localmente no estado

  // Função para formatar a data para o formato 'YYYY-MM-DDTHH:mm'
  // eslint-disable-next-line no-unused-vars
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().slice(0, 16);  // Retorna formato 'YYYY-MM-DDTHH:mm'
  };

  // Função que será chamada ao submeter o formulário de busca
  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Montando os parâmetros de busca
    const params = {};
    if (resource) params.resource = resource;
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;

    try {
      const response = await axios.get('http://localhost:3001/reservations/search', { params });
      setLoading(false);
      
      // Se não encontrar resultados
      if (response.data.length === 0) {
        setError('Nenhuma reserva encontrada para os critérios especificados.');
      } else {
        setReservations(response.data); // Armazenando as reservas no estado local
      }
    } catch (err) {
      setLoading(false);
      setError('Erro ao buscar reservas. Tente novamente.');
    }
  };

  return (
    <div className="search-reservation">
      <h2>Buscar Reservas</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label>Recurso:</label>
          <input
            type="text"
            placeholder="Ex: Sala 1"
            value={resource}
            onChange={(e) => setResource(e.target.value)}
          />
        </div>

        <label>
          Data Inicial:
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          Data Final:
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>

        <button type="submit" className="search-btn">
          {loading ? 'Buscando...' : 'Buscar Reservas'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {/* Exibe as reservas retornadas */}
      {reservations.length > 0 && (
        <div className="reservations-list">
          <h3>Reservas Encontradas:</h3>
          <ul>
            {reservations.map((reservation) => (
              <li key={reservation.id}>
                <strong>{reservation.resource}</strong> - {reservation.user} <br />
                <small>{new Date(reservation.start_time).toLocaleString()} - {new Date(reservation.end_time).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchReservation;
