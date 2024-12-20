const filterReservationsByQuery = (query, reservations) => {
    let filtered = reservations;

    const { resource, start_date, end_date } = query;

    if (resource) {
        filtered = filtered.filter(({ resource: res }) => res.toLowerCase().includes(resource.toLowerCase()));
    }

    if (start_date) {
        const startDate = new Date(start_date);
        filtered = filtered.filter(({ start_time }) => new Date(start_time) >= startDate);
    }

    if (end_date) {
        const endDate = new Date(end_date);
        filtered = filtered.filter(({ end_time }) => new Date(end_time) <= endDate);
    }

    return filtered;
};

module.exports = { filterReservationsByQuery };
