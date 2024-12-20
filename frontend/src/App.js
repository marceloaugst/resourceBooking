import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home.js';
import AddReservation from './pages/AddReservation';
import SearchReservations from './pages/SearchReservations';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-reservation" element={<AddReservation />} />
          <Route path="/search-reservations" element={<SearchReservations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
