import axios from "axios";

const BASE_URL = "http://localhost:5050/api/admin/doctors"; // fixed URL for doctors

// ✅ GET all doctors
export const getAllDoctorsService = async () => {
  const response = await axios.get(BASE_URL, { withCredentials: true });
  return response.data; // returns the backend response
};

// ✅ GET one doctor by ID
export const getOneDoctorService = (id) =>
  axios.get(`${BASE_URL}/${id}`, { withCredentials: true });

// ✅ CREATE doctor (with image FormData if needed)
export const createDoctorService = (data) =>
  axios.post(BASE_URL, data, { withCredentials: true });

// ✅ UPDATE doctor
export const updateDoctorService = (id, data) =>
  axios.put(`${BASE_URL}/${id}`, data, { withCredentials: true });

// ✅ DELETE doctor
export const deleteDoctorService = (id) =>
  axios.delete(`${BASE_URL}/${id}`, { withCredentials: true });
