import axios from "axios";

const BASE_URL = "http://localhost:5050/api/admin/appointments";

// GET all appointments
export const getAllAppointmentsService = () =>
  axios.get(BASE_URL, { withCredentials: true });

// GET one appointment
export const getOneAppointmentService = (id) =>
  axios.get(`${BASE_URL}/${id}`, { withCredentials: true });

// CREATE appointment
export const createAppointmentService = (data) =>
  axios.post(BASE_URL, data, { withCredentials: true });

// UPDATE appointment
export const updateAppointmentService = (id, data) =>
  axios.put(`${BASE_URL}/${id}`, data, { withCredentials: true });

// DELETE appointment
export const deleteAppointmentService = (id) =>
  axios.delete(`${BASE_URL}/${id}`, { withCredentials: true });
