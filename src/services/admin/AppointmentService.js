import axios from "axios";

const BASE_URL = "http://localhost:5050/api/admin/appointments"; // fixed URL

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAllAppointmentsService = () =>
  axios.get(BASE_URL, getAuthHeader());

export const getOneAppointmentService = (id) =>
  axios.get(`${BASE_URL}/${id}`, getAuthHeader());

export const createAppointmentService = (data) =>
  axios.post(BASE_URL, data, getAuthHeader());

export const updateAppointmentService = (id, data) =>
  axios.put(`${BASE_URL}/${id}`, data, getAuthHeader());

export const deleteAppointmentService = (id) =>
  axios.delete(`${BASE_URL}/${id}`, getAuthHeader());
