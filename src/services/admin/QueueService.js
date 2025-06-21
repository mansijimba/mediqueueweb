// services/admin/queueService.js
import axios from "axios";

const BASE_URL = "http://localhost:5050/api/admin/queues"; // Change this to your backend's queue endpoint

// Get all queue entries
export const getAllQueuesService = async () => {
  const response = await axios.get(BASE_URL);
  return response.data; // Expecting { data: [...] }
};

// Get one queue entry by ID
export const getOneQueueService = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

// Create a new queue entry
export const createQueueService = async (data) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

// Update a queue entry by ID
export const updateQueueService = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/${id}`, data);
  return response.data;
};

// Delete a queue entry by ID
export const deleteQueueService = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
