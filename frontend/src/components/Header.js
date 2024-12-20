import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';

function Header() {
  return (
    <header className="header">
      <h1>Gerenciador de Reservas</h1>
      <nav>
        <Link to="/">Início</Link>
        <Link to="/add-reservation">Adicionar Reserva</Link>
        <Link to="/search-reservations">Buscar Reservas</Link>
      </nav>
    </header>
  );
}

export default Header;
