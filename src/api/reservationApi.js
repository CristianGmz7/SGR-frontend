import { API } from './base';

const reservationsApi = {
  getReservations: (page = 1, clientId = "") => API.get("/reservations", { params: { page, clientId}}),
}

export { reservationsApi };