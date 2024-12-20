import React from 'react';

function ReservationList({ reservations, onCancel }) {
  return (
    <ul className="list">
      {reservations.map((res) => (
        <li key={res.id}>
          <strong>{res.resource}</strong> reservado por {res.user} <br />
          <span>
            {new Date(res.start_time).toLocaleString()} -{' '}
            {new Date(res.end_time).toLocaleString()}
          </span>
          <button 
            className="cancel-button" 
            onClick={() => onCancel(res.id)}>
            Cancelar
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ReservationList;
