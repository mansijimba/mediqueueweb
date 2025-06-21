import axios from "axios";

const BASE_URL = "http://localhost:5050/api/admin/doctors"; // fixed URL for doctors

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAllDoctorsService = async () => {
  const response = await axios.get(BASE_URL, getAuthHeader());
  return response.data; // <-- this is the key part
};

export const getOneDoctorService = (id) =>
  axios.get(`${BASE_URL}/${id}`, getAuthHeader());

// For creating a doctor, if you have image upload, data might be FormData
export const createDoctorService = (data) =>
  axios.post(BASE_URL, data, getAuthHeader());

export const updateDoctorService = (id, data) =>
  axios.put(`${BASE_URL}/${id}`, data, getAuthHeader());

export const deleteDoctorService = (id) =>
  axios.delete(`${BASE_URL}/${id}`, getAuthHeader());
