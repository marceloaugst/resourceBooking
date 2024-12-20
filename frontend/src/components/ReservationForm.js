import React, { useState } from 'react';
import axios from 'axios';
import './styles/Form.css';

function ReservationForm() {
  const [form, setForm] = useState({
    resource: '',
    user: '',
    start_time: '',
    end_time: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError(''); // Limpa erros ao digitar
    setSuccess(''); // Limpa mensagens de sucesso ao digitar
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação local para garantir que todos os campos estejam preenchidos
    if (!form.resource || !form.user || !form.start_time || !form.end_time) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    // Formatação das datas para ISO 8601
    const formattedData = {
      ...form,
      start_time: new Date(form.start_time).toISOString(),
      end_time: new Date(form.end_time).toISOString(),
    };

    // Enviando a reserva para o backend
    axios
      .post('http://localhost:3001/reservations', formattedData)
      .then(() => {
        setSuccess('Reserva adicionada com sucesso!');
        setForm({ resource: '', user: '', start_time: '', end_time: '' }); // Limpa o formulário
      })
      .catch((error) => {
        setError(error.response?.data?.message || 'Erro ao adicionar reserva.');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Recurso:
        <input
          type="text"
          name="resource"
          value={form.resource}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Usuário:
        <input
          type="text"
          name="user"
          value={form.user}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Início (Data e Hora):
        <input
          type="datetime-local"
          name="start_time"
          value={form.start_time}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Fim (Data e Hora):
        <input
          type="datetime-local"
          name="end_time"
          value={form.end_time}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Adicionar Reserva</button>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </form>
  );
}

export default ReservationForm;
