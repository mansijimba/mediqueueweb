import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddDoctor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    email: "",
    phone: "",
    status: "Active",
    availability: "",
    appointments: 0,
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("specialty", formData.specialty);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("status", formData.status);
    data.append("availability", formData.availability);
    data.append("appointments", formData.appointments);
    if (formData.file) {
      data.append("image", formData.file);
    }

    try {
      await axios.post("http://localhost:5050/api/admin/doctors", data);
      navigate("/admin/doctors");
    } catch (err) {
      setError("Failed to add doctor. Please check the form and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md p-6 rounded">
      <h2 className="text-2xl font-semibold mb-6">Add New Doctor</h2>

      {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Specialty */}
        <div>
          <label className="block mb-1 font-medium">Specialty</label>
          <input
            type="text"
            name="specialty"
            required
            value={formData.specialty}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Availability */}
        <div>
          <label className="block mb-1 font-medium">Availability</label>
          <input
            type="text"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>

        {/* Appointments */}
        <div>
          <label className="block mb-1 font-medium">Appointments</label>
          <input
            type="number"
            name="appointments"
            value={formData.appointments}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            min="0"
          />
        </div>

        {/* Profile Photo */}
        <div>
          <label className="block mb-1 font-medium">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            {loading ? "Adding..." : "Add Doctor"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/doctors")}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
