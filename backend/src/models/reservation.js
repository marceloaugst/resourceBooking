const { v4: uuidv4 } = require('uuid');

// A lista de reservas está agora aqui, no modelo
const reservations = [];

class Reservation {
    constructor(resource, user, start_time, end_time) {
        this.id = uuidv4();
        this.resource = resource;
        this.user = user;
        this.start_time = start_time;
        this.end_time = end_time;
    }
}

const hasConflict = (newReservation) => {
    const { resource, start_time, end_time } = newReservation;
    const newStart = new Date(start_time);
    const newEnd = new Date(end_time);

    return reservations.some(({ resource: existingResource, start_time: existingStart, end_time: existingEnd }) => {
        const existingStartDate = new Date(existingStart);
        const existingEndDate = new Date(existingEnd);

        return existingResource === resource &&
            (newStart < existingEndDate) &&
            (newEnd > existingStartDate);
    });
};

module.exports = { reservations, Reservation, hasConflict };
