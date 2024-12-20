# Resource Booking System

Este é um sistema de gerenciamento de reservas de recursos, como salas de reuniões ou equipamentos, onde os usuários podem criar, listar, buscar e cancelar reservas.

## Funcionalidades

- **Criar uma nova reserva**: Permite que um usuário faça uma reserva de um recurso específico em um horário definido.
- **Cancelar uma reserva existente**: Permite que um usuário cancele uma reserva que já tenha feito.
- **Listar todas as reservas**: Exibe todas as reservas armazenadas no sistema.
- **Buscar reservas por recurso e data**: Permite a busca de reservas filtradas por recurso e intervalo de datas.
- **Prevenção de conflitos de horário**: O sistema garante que não haverá conflitos entre as reservas de um mesmo recurso.

## Tecnologias Utilizadas

- **Backend**: Node.js com Express
- **Banco de Dados**: Armazenamento em memória (JSON)
- **Front-end**: React (Caso tenha frontend)
- **Outras Tecnologias**: UUID para identificação única de reservas, CORS para permitir requisições de diferentes origens.

## Instalação

### Requisitos

- [Node.js](https://nodejs.org/) >= v14.x.x
- [npm](https://www.npmjs.com/) >= 6.x.x

## Instale as dependências do backend:
cd backend
npm install

## Inicie o servidor:
npm start

O servidor estará rodando em http://localhost:3001.

######

### Endpoints da API
## GET /reservations
Resposta (Status 200):
[
  {
    "id": "uuid",
    "resource": "Sala 1",
    "user": "João Silva",
    "start_time": "2024-12-18T10:00:00",
    "end_time": "2024-12-18T12:00:00"
  }
]

## POST /reservations
## Cria uma nova reserva.
{
  "resource": "Sala 1",
  "user": "João Silva",
  "start_time": "2024-12-18T10:00:00",
  "end_time": "2024-12-18T12:00:00"
}
Resposta (Status 201):
{
  "id": "uuid",
  "resource": "Sala 1",
  "user": "João Silva",
  "start_time": "2024-12-18T10:00:00",
  "end_time": "2024-12-18T12:00:00"
}

## DELETE /reservations/:id
Cancela uma reserva existente.
Parâmetros:
id: O ID da reserva a ser cancelada.

## GET /reservations/search
Busca reservas filtradas por recurso e intervalo de data.

Parâmetros de consulta (Query Params):
resource: Nome do recurso a ser buscado.
start_date: Data de início (formato: yyyy-mm-ddThh:mm:ss).
end_date: Data final (formato: yyyy-mm-ddThh:mm:ss).
Resposta (Status 200):
[
  {
    "id": "uuid",
    "resource": "Sala 1",
    "user": "João Silva",
    "start_time": "2024-12-18T10:00:00",
    "end_time": "2024-12-18T12:00:00"
  }
]